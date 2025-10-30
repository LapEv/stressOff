import { Router } from 'express'
import { messagesController } from '../controllers/messages'
const roleMiddleware = require('../middleware/roleMiddleware')

export const messageRouter = (apiRouter: Router) => {
  const service = new messagesController()

  const router: Router = Router()

  router.post(
    '/addMessage',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addMessage,
  )
  router.get(
    '/getAllMessages',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getAllMessages,
  )
  router.post(
    '/updateUnreadInMessage',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateUnreadInMessage,
  )
  apiRouter.use('/messages', router)
}
