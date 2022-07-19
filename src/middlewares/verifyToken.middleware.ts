import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

/**
 * Middleware to check JWT verification
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Response } res Response to verification JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verificaton or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check HEADER from Request for 'x-access-token'
  const jwtToken: any = req.headers['x-access-token']

  // Verify if jwtToken is present
  if (!jwtToken) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not authorised to consume this endpoint'
    })
  }

  // Check the jwtToken obtained
  jwt.verify(jwtToken, '', (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT verification failed',
        message: 'Failed to verify JWT token in request'
      })
    }

    // If JWT is OK pass something to next request (id of user || other info)

    // Execute Next Function --> Protected Routes will be executed
    next()
  })
}
