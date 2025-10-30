import { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
require('dotenv').config()

module.exports = function (roles: []) {
  return async function (_req: Request, res: Response, next: NextFunction) {
    if (_req.method === 'OPTIONS') {
      next()
    }
    const { SECRET_KEY } = process.env
    try {
      const token = _req.header('Authorization')?.replace('Bearer ', '')
      if (!token) {
        return res.status(403).json({ message: 'The user is not logged in' })
      }
      const verifycode = jwt.verify(token, SECRET_KEY as Secret) as JwtPayload
      let hasRole = false
      verifycode.roles.map((role: string) => {
        if (roles.includes(role as never)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: "You don't have access!" })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'The user is not logged in' })
    }
  }
}
