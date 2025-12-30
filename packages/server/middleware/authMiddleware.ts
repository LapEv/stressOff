import type { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { auth } from '../data/auth'
require('dotenv').config()

interface jwtAnswer {
  id: string
  roles: string[]
  username: string
  type: string
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const { SECRET_KEY } = process.env
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: auth.notification.notLogged })
    }
    const verify = jwt.verify(token, SECRET_KEY as Secret)
    console.log('token = ', token)
    console.log('verify = ', verify)
    const { id, roles, username, type } = verify as jwtAnswer
    req.body = { ...req.body, id, roles, username, type }
    next()
  } catch (e) {
    res.status(401).json({ message: auth.notification.notLogged })
  }
}
