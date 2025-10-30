import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      role?: string
      user?: string | JwtPayload
      token?: string | JwtPayload
      roleMiddleware: () => void
    }
  }
}
