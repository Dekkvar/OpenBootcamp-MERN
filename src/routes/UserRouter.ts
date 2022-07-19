// Router: Enruta los controladores para ejecutarlos en la base de datos.

import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/users
usersRouter.route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    // Controller Instance to execute method
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.getUsers(id)
    // Send to the client the response
    return res.status(200).send(response)
  })

  // DELETE:
  .delete(async (req: Request, res: Response) => {
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

  // POST:
  .post(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age

    // Controller Instance to execute method
    const controller: UserController = new UserController()

    const user = {
      name: name || 'default',
      email: email || 'default email',
      age: age || 18
    }

    // Obtain Response
    const response: any = await controller.createUser(user)
    // Send to the client the response
    return res.status(201).send(response)
  })

  // PUT:
  .put(async (req: Request, res: Response) => {
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
