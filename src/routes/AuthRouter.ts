import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// Router from express
const authRouter = express.Router()

authRouter.route('/auth/register')
  .post(async (req: Request, res: Response) => {
    const { name, email, password, age } = req.body
    let hashedPassword = ''

    if (name && password && email && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcrypt.hashSync(password, 8)

      const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age
      }
      // Controller Instance to execute method
      const controller: AuthController = new AuthController()
      // Obtain Response
      const response: any = await controller.registerUser(newUser)
      // Send to the client the response
      return res.status(200).send(response)
    }
  })

authRouter.route('/auth/login')
  .post(async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (email && password) {
      // Controller Instance to execute method
      const controller: AuthController = new AuthController()

      const auth: IAuth = {
        email,
        password
      }

      // Obtain Response
      const response: any = await controller.loginUser(auth)
      // Send to the client the response which includes the JWT to authorize requests
      return res.status(200).send(response)
    }
  })

export default authRouter
