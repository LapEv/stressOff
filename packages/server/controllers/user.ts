import type { Request, Response } from 'express'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
import { serverData } from '../data/const'
import { INotificationForUser, IUser, User } from '../models/auth/user'
import { SoundCategory } from '../models/data/soundCategories'
import { Role } from '../models/auth/role'
import { MusicCategory } from '../models/data/musicCategories'
import { DataSound } from '../models/data/dataSounds'
import { DataMusic } from '../models/data/dataMusics'
import { IRequests } from '../models/request/request'
import { getIndexString } from '../utils/getIndexString'
import { generatePassword } from '../utils/generatePassword'
import { sendMailResetPassword } from '../Mailer/sendMailResetPassword'

type IPrepareDataUser = {
  username: string
  password: string
  email: string
  type: string
  roles: string[]
  language: string | null
  theme: string | null
}

type IObjLanguage = {
  RUS: string
  ENG: string
}

const generateAccessToken = (
  id: string,
  roles: string[],
  username: string,
  type: string,
  expiresIn: string | null,
) => {
  const payload = { id, roles, username, type }
  const _jwt = expiresIn
    ? jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn: '720h',
      })
    : jwt.sign(payload, process.env.SECRET_KEY as string)
  return _jwt
}

const prepareDataForUser = async ({
  username,
  password,
  email,
  type,
  roles,
  language,
  theme,
}: IPrepareDataUser) => {
  const hashPassword = password ? bcrypt.hashSync(password, 7) : ''

  const usersLength = await User.estimatedDocumentCount()
  const _token = `MS_token_${getIndexString(
    usersLength + 1,
    serverData.dataConsts.tokenRange,
  )}`

  const dataSoundCat = await SoundCategory.find()
  const sound_categories = dataSoundCat.map(
    ({ id, category, img, img_lt, imgStorage, imgStorage_lt }) => {
      return { id, category, img, img_lt, imgStorage, imgStorage_lt }
    },
  )
  const dataMusicCat = await MusicCategory.find()
  const music_categories = dataMusicCat.map(({ id, category, img, img_lt }) => {
    return { id, category, img, img_lt }
  })
  const data_sound = await DataSound.find()
  const sounds = data_sound.map(
    ({
      id,
      name,
      img,
      imgStorage,
      sound,
      storage,
      location,
      booked,
      newSound,
    }) => {
      return {
        id,
        name,
        img,
        imgStorage,
        sound,
        storage,
        location,
        booked,
        newSound,
      }
    },
  )
  const data_music = await DataMusic.find()
  const musics = data_music.map(
    ({
      id,
      name,
      img,
      imgStorage,
      sound,
      storage,
      location,
      booked,
      newSound,
    }) => {
      return {
        id,
        name,
        img,
        imgStorage,
        sound,
        storage,
        location,
        booked,
        newSound,
      }
    },
  )

  return {
    globalCategory: serverData.dataConsts.globalCategoryUsers,
    personalData: {
      username,
      password: hashPassword,
      email,
      name: '',
      type: type ?? serverData.dataConsts.freeUser,
      roles: roles ?? ['USER'],
      createdAt: new Date(),
      token: _token,
    },
    appData: {
      language: language ?? 'RUS',
      theme: theme ?? 'MAIN_THEME',
      notificationsByEmail: {
        news: true,
        newSounds: true,
        requestStatuses: true,
      },
    },
    Notification: serverData.welcomeNotification,
    SOUNDS_Categories: sound_categories,
    MUSICS_Categories: music_categories,
    DATA_SOUNDS: sounds,
    DATA_MUSICS: musics,
  }
}

export class userController {
  registration = async (req: Request, res: Response) => {
    try {
      const errValidation = validationResult(req)
      if (!errValidation.isEmpty()) {
        return res.status(400).json({
          message: `${serverData.APInotifications.auth.errorRegistration.ENG}: ${errValidation.errors[0].msg}`,
          errValidation,
        })
      }
      const { username } = req.body
      const candidate = await User.findOne({
        'personalData.username': username,
      })
      if (candidate) {
        return res
          .status(400)
          .json({ message: serverData.APInotifications.auth.duplicateUser })
      }
      const newUserData = await prepareDataForUser(req.body)
      const newUser = new User(newUserData)
      const resultUser = await newUser.save()

      return res.json({
        message: serverData.APInotifications.auth.successfulRegistration,
        resultUser: resultUser,
      })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.errorRegistration}: ${(e as Error).message}`,
      })
    }
  }

  setAnonymousUser = async (_req: Request, res: Response) => {
    try {
      const usersAnonymous = await User.countDocuments({
        'personalData.type': 'isAnonymous',
      })
      const anonymousUser = {
        username: `AnonymousUser_${usersAnonymous + 1}`,
        password: 'AnonymousUser',
        email: `AnonymousUser_${usersAnonymous + 1}@stressoff.ru`,
        type: 'isAnonymous',
        roles: ['USER'],
        language: null,
        theme: null,
      }
      const newUserData = await prepareDataForUser(anonymousUser)
      const newUser = new User(newUserData)
      const resultUser = await newUser.save()
      const expiresIn = null
      const token = generateAccessToken(
        resultUser.id,
        resultUser.personalData.roles,
        resultUser.personalData.username,
        resultUser.personalData.type,
        expiresIn,
      )

      return res.json({
        message: serverData.APInotifications.auth.successfulRegistration,
        user: resultUser,
        token,
      })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.errorRegistration}: ${(e as Error).message}`,
      })
    }
  }

  resetPassword = async (_req: Request, res: Response) => {
    try {
      const { email } = _req.body
      const user = await User.findOne({ 'personalData.email': email })
      if (!user) {
        return res
          .status(400)
          .json({ message: serverData.APInotifications.auth.userNotFound })
      }
      const password = generatePassword()
      const hashPassword = password ? bcrypt.hashSync(password, 7) : ''

      await User.updateOne(
        { _id: user._id },
        { 'personalData.password': hashPassword },
      )
      sendMailResetPassword({ email, password })
      return res.json({
        message: serverData.APInotifications.auth.updatePasswordForUser,
        status: true,
      })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.errorRegistration}: ${(e as Error).message}`,
      })
    }
  }

  changePassword = async (req: Request, res: Response) => {
    try {
      const { _id, password } = req.body
      const user = await User.findOne({ _id })
      if (!user) {
        return res
          .status(400)
          .json({ message: serverData.APInotifications.auth.userNotFound })
      }
      const hashPassword = password ? bcrypt.hashSync(password, 7) : ''

      await User.updateOne(
        { _id: user._id },
        { 'personalData.password': hashPassword },
      )
      const { id } = user
      const expiresIn = '720h'
      const token = generateAccessToken(
        id,
        user.personalData.roles,
        user.personalData.username,
        user.personalData.type,
        expiresIn,
      )
      return res.json({ token })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.loginError}: ${(e as Error).message}`,
      })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ 'personalData.username': username })
      if (!user) {
        return res
          .status(400)
          .json({ message: serverData.APInotifications.auth.userNotFound })
      }
      const validPassword = bcrypt.compareSync(
        password,
        user.personalData.password,
      )

      if (!validPassword) {
        return res
          .status(400)
          .json({ message: serverData.APInotifications.auth.invalidPassword })
      }
      const { id } = user
      const expiresIn = '720h'
      const token = generateAccessToken(
        id,
        user.personalData.roles,
        user.personalData.username,
        user.personalData.type,
        expiresIn,
      )
      return res.json({ token })
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.loginError}: ${(e as Error).message}`,
      })
    }
  }

  updateUser = async (req: Request, res: Response) => {
    try {
      const { _id } = req.body
      const result = await User.updateOne({ _id: _id }, req.body)
      return res.json({
        message: serverData.APInotifications.auth.updateUser,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.updateUserError}: ${(e as Error).message}`,
      })
    }
  }

  findUserDataSV = async (_req: Request, res: Response, id: string) => {
    try {
      const result = await User.findOne({ _id: id })
      return result
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.findUserError}: ${(e as Error).message}`,
      })
    }
  }

  findUserData = async (_req: Request, res: Response) => {
    try {
      const { id } = _req.body
      const result = await User.findOne({ _id: id })
      return res.json(result)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.findUserError}: ${(e as Error).message}`,
      })
    }
  }

  check = (req: Request, res: Response) => {
    try {
      const { username, id, roles, type } = req.body
      const expiresIn = '720h'
      const token = generateAccessToken(id, roles, username, type, expiresIn)
      return res.json({ token })
    } catch (e) {
      return res.status(400).json({ message: `${(e as Error).message}` })
    }
  }

  getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.getUsers}: ${(e as Error).message}`,
      })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const result = await User.findOneAndDelete({ _id: req.body._id })
      return res.json({
        message: serverData.APInotifications.auth.deleteUser,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.deleteUser}: ${(e as Error).message}`,
      })
    }
  }

  getRoles = async (_req: Request, res: Response) => {
    try {
      const roles = await Role.find()
      return res.json(roles)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.getRoles}: ${(e as Error).message}`,
      })
    }
  }

  setNewRole = async (req: Request, res: Response) => {
    try {
      const errValidation = validationResult(req)
      if (!errValidation.isEmpty()) {
        return res.status(400).json({
          message: serverData.APInotifications.auth.errorNewRole,
          errValidation,
        })
      }
      const { role } = req.body
      const checkRole = await Role.findOne({ value: role })
      if (checkRole) {
        return res
          .status(400)
          .json({ message: serverData.APInotifications.auth.duplicatRole })
      }
      const newRole = new Role({
        value: role,
      })
      await newRole.save()
      return res.json({
        message: serverData.APInotifications.auth.successfulRole,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.errorNewRole}: ${(e as Error).message}`,
      })
    }
  }

  deleteRole = async (req: Request, res: Response) => {
    try {
      const result = await Role.findOneAndDelete(req.body)
      return res.json({
        message: serverData.APInotifications.data.deleteObject,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.auth.delRoleError}: ${(e as Error).message}`,
      })
    }
  }

  addNotificationForUsers = async (data: INotificationForUser) => {
    const findedFree = data.anonymousUsers
      ? await User.find({
          'personalData.type': serverData.dataConsts.freeUser,
        })
      : []
    const findedPremium = data.premiumUsers
      ? await User.find({
          'personalData.type': serverData.dataConsts.premiumUser,
        })
      : []
    const finded = [...findedFree, ...findedPremium]
    const result = await this.addNotification(finded, data)
    return result.map(value => value?.personalData.username)
  }

  addNotificationForUser = async (data: IRequests, type: string) => {
    typeof data.userID
    const finded = (await User.findOne({
      _id: data.userID,
    })) as IUser
    const notification =
      type === serverData.requestsConsts.updateStatusRequest
        ? this.changeStatusRequestNotification(data, finded)
        : this.addRequestNotification(data, finded)
    if (notification) {
      // eslint-disable-next-line
      const result = await this.addNotification([finded], notification as any)
      return result.map(value => value?.personalData.username)
    }
    return ''
  }

  updateNotificationForUsers = async (data: INotificationForUser) => {
    const resultUpdate = await User.updateMany(
      {
        'Notification.id': data.id,
      },
      { $set: { 'Notification.$': data } },
    )

    const findedFree = data.anonymousUsers
      ? ((await User.find({
          $and: [
            { 'Notification.id': { $ne: data.id } },
            { 'personalData.type': serverData.dataConsts.freeUser },
          ],
        })) as IUser[])
      : []
    const findedPremium = data.premiumUsers
      ? ((await User.find({
          $and: [
            { 'Notification.id': { $ne: data.id } },
            { 'personalData.type': serverData.dataConsts.premiumUser },
          ],
        })) as IUser[])
      : []
    const finded = [...findedFree, ...findedPremium]
    const result = await this.addNotification(finded, data)
    return {
      added: result.map(value => value?.personalData.username),
      updated: resultUpdate,
    }
  }

  addNotification = async (
    finded: IUser[],
    notification: INotificationForUser,
  ) => {
    const resultMapped = finded.map(async value => {
      try {
        value.Notification.push(notification)
        const res = await value.save()
        return res
      } catch (error) {
        console.log('err = ', error)
      }
    })
    return await Promise.all(resultMapped)
  }

  addRequestNotification = (data: IRequests, finded: IUser) => {
    const status = serverData.requestsConsts.statusRequestArr.find(
      item => item.value === data.status,
    )?.name as IObjLanguage
    const date = new Date()
    return {
      anonymousUsers:
        finded.personalData.type === serverData.dataConsts.freeUser
          ? true
          : false,
      body: {
        RUS: `${serverData.requestsConsts.addRequest.RUS}№${data.number}. \n${serverData.mailConstants.topic.RUS}${data.topic}\n${serverData.mailConstants.description.RUS}${data.description}\n${serverData.mailConstants.solution.RUS}${data.solution}`,
        ENG: `${serverData.requestsConsts.addRequest.ENG}№${data.number}. \n${serverData.mailConstants.topic.ENG}${data.topic}\n${serverData.mailConstants.description.ENG}${data.description}\n${serverData.mailConstants.solution.ENG}${data.solution}`,
      },
      date: date,
      id: finded.Notification.length + 1,
      img: '',
      name: `${data.number}${
        data.status
      }${date.getDate()}${date.getHours()}${date.getMilliseconds()}`,
      premiumUsers:
        finded.personalData.type !== serverData.dataConsts.freeUser
          ? true
          : false,
      push: true,
      title: {
        RUS: `${serverData.requestsConsts.addRequest.RUS} №${data.number} "${status.RUS}".`,
        ENG: `${serverData.requestsConsts.addRequest.ENG} №${data.number} "${status.ENG}".`,
      },
      unread: true,
      globalCategory: serverData.dataConsts.globalCategoryNotifications,
    }
  }

  changeStatusRequestNotification = (data: IRequests, finded: IUser) => {
    const status = serverData.requestsConsts.statusRequestArr.find(
      item => item.value === data.status,
    )?.name as IObjLanguage
    const date = new Date()
    return {
      anonymousUsers:
        finded.personalData.type === serverData.dataConsts.freeUser
          ? true
          : false,
      body: {
        RUS: `${serverData.requestsConsts.changeStatusRequest.RUS}№${data.number} "${status.RUS}". \n${serverData.mailConstants.topic.RUS}${data.topic}\n${serverData.mailConstants.description.RUS}${data.description}\n${serverData.mailConstants.solution.RUS}${data.solution}`,
        ENG: `${serverData.requestsConsts.changeStatusRequest.ENG}№${data.number} "${status.ENG}". \n${serverData.mailConstants.topic.ENG}${data.topic}\n${serverData.mailConstants.description.ENG}${data.description}\n${serverData.mailConstants.solution.ENG}${data.solution}`,
      },
      date: date,
      id: finded.Notification.length + 1,
      img: '',
      name: `${data.number}${
        data.status
      }${date.getDate()}${date.getHours()}${date.getMilliseconds()}`,
      premiumUsers:
        finded.personalData.type !== serverData.dataConsts.freeUser
          ? true
          : false,
      push: true,
      title: {
        RUS: `${serverData.requestsConsts.changeStatusRequest.RUS} №${data.number} "${status.RUS}".`,
        ENG: `${serverData.requestsConsts.changeStatusRequest.ENG} №${data.number} "${status.ENG}".`,
      },
      unread: true,
      globalCategory: serverData.dataConsts.globalCategoryNotifications,
    }
  }
}
