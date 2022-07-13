import express, { Request, Response } from 'express'
import { GoodbyeController } from '../controller/GoodbyeController'
import { LogInfo } from '../utils/logger'

// Router from express
const goodbyeRouter = express.Router()

// http://localhost:8000/api/goodbye?name=Aitor/
goodbyeRouter.route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const name: any = req?.query?.name
    LogInfo(`Query Param: ${name}`)
    // Controller Instance to execute method
    const controller: GoodbyeController = new GoodbyeController()
    // Obtain Response
    const response = await controller.getMessage(name)
    // Send to the client the response
    return res.send(response)
  })

// Export Hello Router
export default goodbyeRouter
