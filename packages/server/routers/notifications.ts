import { Router } from 'express'
import { notificatiosController } from '../controllers/notifications'
const roleMiddleware = require('../middleware/roleMiddleware')

export const notificationsRouter = (apiRouter: Router) => {
  const service = new notificatiosController()

  const router: Router = Router()

  router.post(
    '/addNotification',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addNotification,
  )

  router.post(
    '/updateNotification',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateNotification,
  )

  router.get(
    '/getAllNotifications',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getAllNotifications,
  )

  router.delete(
    '/deleteNotificationById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteNotificationById,
  )

  apiRouter.use('/notifications', router)
}
