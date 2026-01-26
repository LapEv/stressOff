import { serverData } from './../data/const'
import type { Request, Response } from 'express'
import { Notification } from '../models/notification/notification'
import { userController } from './user'

export class notificatiosController {
  addNotification = async (req: Request, res: Response) => {
    try {
      const id = ((await Notification.estimatedDocumentCount()) + 1).toString()
      const date = new Date().toString()
      const newNotification = new Notification({ ...req.body, date, id })
      const result = await newNotification.save()
      const service = new userController()
      // eslint-disable-next-line
      const addResult = await service.addNotificationForUsers(result as any)
      return res.json({
        message: serverData.APInotifications.notification.addNotification,
        object: result,
        updateUser: addResult,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.notification.addNotificationError}: ${(e as Error).message}`,
      })
    }
  }

  async updateNotification(req: Request, res: Response) {
    try {
      const { id } = req.body
      const result = await Notification.updateOne({ id: id }, req.body)
      const service = new userController()
      const updateResult = await service.updateNotificationForUsers(req.body)
      return res.json({
        message: serverData.APInotifications.notification.updateNotification,
        object: result,
        updateUser: updateResult,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.notification.updateNotificationError}: ${(e as Error).message}`,
      })
    }
  }

  async getAllNotifications(_req: Request, res: Response) {
    try {
      const data = await Notification.find()
      return res.json(data)
    } catch (e) {
      res.status(400).json({
        message: `${serverData.APInotifications.notification.getAllNotifications}: ${(e as Error).message}`,
      })
    }
  }

  async deleteNotificationById(req: Request, res: Response) {
    try {
      const result = await Notification.findOneAndDelete(req.body)
      return res.json({
        message: serverData.APInotifications.data.deleteObject,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteDataByIdError}: ${(e as Error).message}`,
      })
    }
  }
}
