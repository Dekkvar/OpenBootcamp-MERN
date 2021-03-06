import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// JWT verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser to read BODY from requests
import bodyParser from 'body-parser'

// MiddleWare to read JSON in Body
const jsonParser = bodyParser.json()

// Router from express
const authRouter = express.Router()

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { name, email, password, age } = req?.body
    let hashedPassword = ''

    if (name && password && email && age) {
      // Obtain the password in request and cypher
      hashedPassword = bcrypt.hashSync(password, 8)

      const newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age,
        katas: []
      }
      // Controller Instance to execute method
      const controller: AuthController = new AuthController()
      // Obtain Response
      const response: any = await controller.registerUser(newUser)
      // Send to the client the response
      return res.status(200).send(response)
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR User Data Missing]: User can not be registered'
      })
    }
  })

authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    const { email, password } = req?.body

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
    } else {
      // Send to the client the response
      return res.status(400).send({
        message: '[ERROR User Data Missing]: User can not be logged'
      })
    }
  })

// Route Protected by VERIFY TOKEN Middleware
authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the ID of user to check it's data
    const id: any = req?.query?.id

    if (id) {
      // Controller: Auth Controller
      const controller: AuthController = new AuthController()

      // Obtain response from Controller
      const response: any = await controller.userData(id)

      // If user is authorised
      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'You are not authorised to perform this action'
      })
    }
  })

export default authRouter
