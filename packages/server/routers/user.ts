import { serverData } from './../data/const'
import { Router } from 'express'
import { userController } from '../controllers/user'
import { authMiddleware } from '../middleware/authMiddleware'
const roleMiddleware = require('../middleware/roleMiddleware')
const { check } = require('express-validator')

export const userRouter = (apiRouter: Router) => {
  const service = new userController()

  const router: Router = Router()

  router.post(
    '/registration',
    [
      check('username', 'The user name cannot be empty').notEmpty(),
      check(
        'password',
        `The password must be at least ${serverData.authConstants.passwordMinLength} and no more than ${serverData.authConstants.passwordMaxLength} characters`,
      ).isLength({
        min: serverData.authConstants.passwordMinLength,
        max: serverData.authConstants.passwordMaxLength,
      }),
    ],
    service.registration,
  )
  router.post('/login', service.login)
  router.post('/setAnonymousUser', service.setAnonymousUser)
  router.post('/resetPassword', service.resetPassword)
  router.post('/changePassword', service.changePassword)

  router.post(
    '/updateUser',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.updateUser,
  )

  router.get('/check', authMiddleware, service.check)
  router.post('/findUserData', authMiddleware, service.findUserData)

  router.get(
    '/getUsers',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.getUsers,
  )
  router.delete(
    '/deleteUser',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteUser,
  )

  router.get('/getRoles', roleMiddleware(['SUPERADMIN']), service.getRoles)
  router.post('/newRole', roleMiddleware(['SUPERADMIN']), service.setNewRole)
  router.delete(
    '/deleteRole',
    roleMiddleware(['SUPERADMIN']),
    service.deleteRole,
  )
  apiRouter.use('/users', router)
}
