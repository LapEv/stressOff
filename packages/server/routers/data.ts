import { Router } from 'express'
import { dataController } from '../controllers/data'
const roleMiddleware = require('../middleware/roleMiddleware')

export const dataRouter = (apiRouter: Router) => {
  const service = new dataController()

  const router: Router = Router()

  router.post(
    '/writeFullSoundsData',
    roleMiddleware(['SUPERADMIN']),
    service.writeFullSoundsData,
  )

  router.post(
    '/writeFullMusicsData',
    roleMiddleware(['SUPERADMIN']),
    service.writeFullMusicsData,
  )

  router.post(
    '/writeFullSoundCategories',
    roleMiddleware(['SUPERADMIN']),
    service.writeFullSoundCategories,
  )

  router.post(
    '/writeFullMusicCategories',
    roleMiddleware(['SUPERADMIN']),
    service.writeFullMusicCategories,
  )

  router.get(
    '/getFullSoundsData',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getFullSoundsData,
  )

  router.get(
    '/getFullMusicsData',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getFullMusicsData,
  )

  router.get(
    '/getFullSoundCategories',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getFullSoundCategories,
  )

  router.get(
    '/getFullMusicCategories',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'USER']),
    service.getFullMusicCategories,
  )

  router.delete(
    '/deleteSoundDataById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteSoundDataById,
  )

  router.delete(
    '/deleteMusicDataById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteMusicDataById,
  )

  router.delete(
    '/deleteSoundCategoriesById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteSoundCategoriesById,
  )

  router.delete(
    '/deleteMusicCategoriesById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteMusicCategoriesById,
  )

  router.delete(
    '/deleteAllSound',
    roleMiddleware(['SUPERADMIN']),
    service.deleteAllSound,
  )

  router.delete(
    '/deleteAllMusic',
    roleMiddleware(['SUPERADMIN']),
    service.deleteAllMusic,
  )

  router.delete(
    '/deleteAllSoundCategories',
    roleMiddleware(['SUPERADMIN']),
    service.deleteAllSoundCategories,
  )

  router.delete(
    '/deleteAllMusicCategories',
    roleMiddleware(['SUPERADMIN']),
    service.deleteAllMusicCategories,
  )

  router.post(
    '/updateSoundDataById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateSoundDataById,
  )

  router.post(
    '/updateMusicDataById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateMusicDataById,
  )

  router.post(
    '/updateSoundCategoriesById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateSoundCategoriesById,
  )

  router.post(
    '/updateMusicCategoriesById',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateMusicCategoriesById,
  )

  router.post(
    '/addNewSound',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addNewSound,
  )

  router.post(
    '/addNewMusic',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addNewMusic,
  )

  router.post(
    '/addNewSoundCategory',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addNewSoundCategory,
  )

  router.post(
    '/addNewMusicCategory',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.addNewMusicCategory,
  )

  apiRouter.use('/data', router)
}
