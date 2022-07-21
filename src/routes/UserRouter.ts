// Router: Enruta los controladores para ejecutarlos en la base de datos.

import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// JWT verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser to read BODY from requests
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/users
usersRouter.route('/')
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id

    // Pagination
    const page: any = req?.query?.page || 1
    const limit: any = req?.query?.limit || 10

    LogInfo(`Query Param: ${id}`)
    // Controller Instance to execute method
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.getUsers(page, limit, id)
    // Send to the client the response
    return res.status(200).send(response)
  })

  // DELETE:
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    // Controller Instance to execute method
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.deleteUser(id)
    // Send to the client the response
    return res.status(200).send(response)
  })

  // PUT:
  .put(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`)

    const user = {
      name,
      email,
      age
    }
    // Controller Instance to execute method
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.updateUser(id, user)
    // Send to the client the response
    return res.status(200).send(response)
  })

// Export Users Router
export default usersRouter

/**
 *
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No Return)
 * Update of Documents => 200 (Entity) / 204 (No Return)
 *
 */
