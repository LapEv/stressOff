import { Router } from 'express'
import { requestsController } from '../controllers/requests'
const roleMiddleware = require('../middleware/roleMiddleware')

export const requestsRouter = (apiRouter: Router) => {
  const service = new requestsController()

  const router: Router = Router()

  router.post(
    '/addRequest',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addRequest,
  )
  router.post(
    '/updateRequest',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateRequest,
  )
  router.post(
    '/updateUnreadInRequest',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateUnreadInRequest,
  )
  router.get(
    '/getAllRequests',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getAllRequests,
  )
  router.get(
    '/getAllRequestsByStatus',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getAllRequestsByStatus,
  )
  apiRouter.use('/requests', router)
}
