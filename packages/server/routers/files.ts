import { Router } from 'express'
import { fileController } from '../controllers/files'
const roleMiddleware = require('../middleware/roleMiddleware')

export const fileRouter = (apiRouter: Router) => {
  const service = new fileController()

  const router: Router = Router()

  router.post(
    '/uploadFile',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.uploadFile,
  )

  router.get(
    '/getListFiles',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getListFiles,
  )

  router.post(
    '/getFile',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getFile,
  )

  router.post(
    '/createFolder',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.createFolder,
  )

  router.post(
    '/getSoundImages',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getSoundImages,
  )
  router.post(
    '/getMusicImages',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getMusicImages,
  )

  router.post(
    '/getSoundFile',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getSoundFile,
  )
  router.post(
    '/getMusicFile',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getMusicFile,
  )

  apiRouter.use('/files', router)
}
