import { Router } from 'express'
import { userRouter } from './user'
import { dataRouter } from './data'
import { fileRouter } from './files'
import { notificationsRouter } from './notifications'
import { requestsRouter } from './requests'
import { messageRouter } from './messages'

export const apiRouter: Router = Router()

userRouter(apiRouter)
dataRouter(apiRouter)
fileRouter(apiRouter)
notificationsRouter(apiRouter)
requestsRouter(apiRouter)
messageRouter(apiRouter)
