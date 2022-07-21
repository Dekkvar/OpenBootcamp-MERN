import express, { Request, Response } from 'express'
import { KataController } from '../controller/KataController'
import { LogInfo } from '../utils/logger'

// JWT verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Router from express
const katasRouter = express.Router()

// http://localhost:8000/api/katas
katasRouter.route('/')
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param
    const level: any = req?.query?.level
    const last: any = req?.query?.last
    const rated: any = req?.query?.rated
    const chance: any = req?.query?.chance
    // Controller Instance to execute method
    const controller: KataController = new KataController()
    // Obtain Response
    const response: any = await controller.getKatas(level, last, rated, chance)
    // Send to the client the response
    return res.send(response)
  })

  // PUT:
  .put(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Params
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const rating: any = req?.query?.rating
    LogInfo(`Query Params: ${id}, ${name}, ${rating}`)

    const update = {
      name,
      rating
    }

    const controller: KataController = new KataController()

    const response: any = await controller.updateKata(id, update)

    return res.send(response)
  })

export default katasRouter
