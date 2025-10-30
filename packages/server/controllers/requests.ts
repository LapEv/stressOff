import { serverData } from './../data/const'
import type { Request, Response } from 'express'
import { IRequests, Requests } from '../models/request/request'
import { getIndexString } from '../utils/getIndexString'
import { userController } from './user'
import { IUser } from '../models/auth/user'
import { sendMail } from '../Mailer/sendMail'
const socket = require('../utils/socket')

type IReqByStatus = {
  status: string
}

// type ICloseSolved = {
//   number: string
//   userID: string
//   email: string
//   topic: string
//   description: string
//   solution: string
// }

export class requestsController {
  addRequest = async (req: Request, res: Response) => {
    try {
      const count = (await Requests.estimatedDocumentCount()) + 1
      const number = `${serverData.dataConsts.requestNumeration}${getIndexString(
        count,
        serverData.dataConsts.requestRange,
      )}`
      const date = new Date().getTime()
      const { email, status, topic, description, solution, userID } = req.body
      const allRequestById = (await this.getAllRequestsById(
        userID,
      )) as IRequests[]
      const requestsDateByUserId = allRequestById.map(
        value => new Date(value.date).getTime() - 1,
      )

      const isLimit = requestsDateByUserId.filter(
        value =>
          value - 1 > date - serverData.requestsConsts.limitAddRequestForUser,
      )
      const isLimitMax = Math.max(...isLimit)
      if (isLimit.length > 0) {
        const diff =
          serverData.requestsConsts.limitAddRequestForUser - (date - isLimitMax)
        return res.status(400).json({
          message: {
            RUS: `${serverData.APInotifications.request.errorLimit.RUS}${new Date(
              diff,
            )
              .toISOString()
              .substr(11, 8)} (hh:mm:ss)`,
            ENG: `${serverData.APInotifications.request.errorLimit.ENG}${new Date(
              diff,
            )
              .toISOString()
              .substr(11, 8)} (hh:mm:ss)`,
          },
        })
      }
      const service = new userController()
      const userData = (await service.findUserData(req, res, userID)) as IUser
      const username = userData.personalData.username
        ? userData.personalData.username
        : userID
      const userLanguage = userData.appData.language as string
      const checkSendToEmail =
        userData.appData.notificationsByEmail.requestStatuses
      const history = [{ date, status, solution, userID, username }]
      const lastModifiedDate = date
      const newRequest = new Requests({
        ...req.body,
        date,
        lastModifiedDate,
        number,
        history,
      })
      const result = await newRequest.save()
      socket.getIO().emit('server', { newMessage: newRequest })
      const addNotification = await service.addNotificationForUser(
        newRequest,
        '',
      )
      const _status = serverData.requestsConsts.statusRequestArr.find(
        item => item.value === status,
      )?.name[userLanguage as keyof typeof name]
      const subjects = serverData.mailMessages.addRequest.subject
      const sendResult = checkSendToEmail
        ? sendMail({
            adresses: email,
            subject: `${subjects[userLanguage as keyof typeof subjects]} ${number}`,
            number: number,
            status: _status,
            topic: topic,
            description: description,
            solution: solution,
            language: userLanguage,
          })
        : false
      return res.json({
        message: serverData.APInotifications.request.addRequest,
        object: result,
        addNotification: addNotification,
        sendResult: sendResult,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.request.addRequestError}: ${(e as Error).message}`,
      })
    }
  }

  updateRequest = async (req: Request, res: Response) => {
    try {
      const { number } = req.body
      const data = { ...req.body, lastModifiedDate: new Date() }
      const result = await Requests.updateOne({ number: number }, data)
      const service = new userController()
      const addNotification = await service.addNotificationForUser(
        req.body,
        serverData.requestsConsts.updateStatusRequest,
      )
      const { email, status, topic, description, solution, userID } = req.body
      const userData = (await service.findUserData(req, res, userID)) as IUser
      const userLanguage = userData.appData.language
      const checkSendToEmail =
        userData.appData.notificationsByEmail.requestStatuses
      const _status = serverData.requestsConsts.statusRequestArr.find(
        item => item.value === status,
      )?.name[userLanguage as keyof typeof name]
      const subjects = serverData.mailMessages.changeStatusRequest.subject
      const sendResult = checkSendToEmail
        ? sendMail({
            adresses: email,
            subject: subjects[userLanguage as keyof typeof subjects] + number,
            number: number,
            status: _status,
            topic: topic,
            description: description,
            solution: solution,
            language: userLanguage,
          })
        : false

      return res.json({
        message: serverData.APInotifications.request.updateRequest,
        object: result,
        addNotification: addNotification,
        sendResult: sendResult,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.request.updateRequestError}: ${(e as Error).message}`,
      })
    }
  }

  updateUnreadInRequest = async (req: Request, res: Response) => {
    try {
      const { number } = req.body
      const result = await Requests.updateOne({ number: number }, req.body)
      return res.json({
        message: serverData.APInotifications.request.updateUnreadInRequest,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.request.updateUnreadInRequestError}: ${(e as Error).message}`,
      })
    }
  }

  getAllRequests = async (_req: Request, res: Response) => {
    try {
      const data = await Requests.find()
      return res.json(data)
    } catch (e) {
      res.status(400).json({
        message: `${serverData.APInotifications.request.getAllRequets}: ${(e as Error).message}`,
      })
    }
  }

  getAllRequestsByStatus = async ({ status }: IReqByStatus) => {
    try {
      const data = await Requests.find({ status: status })
      return data
    } catch (e) {
      return {
        message: `${serverData.APInotifications.request.getAllRequestsByStatusError}: ${(e as Error).message}`,
      }
    }
  }

  // closingSolvedRequests = async (arrReq: ICloseSolved[]) => {
  //   const temp = await Promise.all(
  //     arrReq.map(async value => {
  //       const result = await this.closeSolved(value)
  //       return result
  //     }),
  //   )
  //   return temp
  // }

  // closeSolved = async (value: ICloseSolved) => {
  //   const { number, userID, email, topic, description } = value
  //   const service = new userController()
  //   const userData = (await service.findUserData(req, res, userID)) as IUser
  //   const username = userData.personalData.username
  //     ? userData.personalData.username
  //     : userID
  //   const userLanguage = userData.appData.language
  //   const status = 'closed'
  //   const autoClosing = serverData.requestsConsts.autoClosingRequest()
  //   const solution = `${value.solution}. ${
  //     autoClosing[userLanguage as keyof typeof autoClosing]
  //   } `
  //   const date = new Date()
  //   const history = { date, status, solution, userID, username }
  //   await Requests.updateOne(
  //     { number: number },
  //     {
  //       status: status,
  //       lastModifiedDate: new Date(),
  //       solution: solution,
  //       $addToSet: { history: history },
  //     },
  //   )
  //   const addNotification = await service.addNotificationForUser(
  //     { number, status, topic, description, solution, userID },
  //     serverData.requestsConsts.updateStatusRequest,
  //   )
  //   const checkSendToEmail =
  //     userData.appData.notificationsByEmail.requestStatuses
  //   const _status = serverData.requestsConsts.statusRequestArr.find(
  //     item => item.value === status,
  //   )?.name[userLanguage as keyof typeof name]
  //   const subjects = serverData.mailMessages.changeStatusRequest.subject
  //   const sendResult = checkSendToEmail
  //     ? await sendMail({
  //         adresses: email,
  //         subject: subjects[userLanguage as keyof typeof subjects] + number,
  //         number: number,
  //         status: _status,
  //         topic: topic,
  //         description: description,
  //         solution: solution,
  //         language: userLanguage,
  //       })
  //     : false

  //   return { userID: addNotification, number: number, sendResult }
  // }

  getAllRequestsById = async (id: string) => {
    try {
      const data = await Requests.find({ userID: id })
      return data
    } catch (e) {
      return {
        message: `${serverData.APInotifications.request.getAllRequestsByIdError}: ${e}`,
      }
    }
  }
}
