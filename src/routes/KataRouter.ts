import express, { Request, Response } from 'express'
import { KataController } from '../controller/KataController'
import { KataLevel, IKata } from '../domain/interfaces/IKata.interface'

// JWT verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware'

// Body Parser to read BODY from requests
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()

// Router from express
const katasRouter = express.Router()

// http://localhost:8000/api/katas
katasRouter.route('/')
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id
    const level: any = req?.query?.level
    const last: any = req?.query?.last
    const rated: any = req?.query?.rated
    const chance: any = req?.query?.chance

    // Pagination
    const page: any = req?.query?.page || 1
    const limit: any = req?.query?.limit || 10

    // Controller Instance to execute method
    const controller: KataController = new KataController()
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id, level, last, rated, chance)
    // Send to the client the response
    return res.send(response)
  })

  // POST:
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    // Obtain Body Params
    const name: String = req?.body?.name
    const description: String = req?.body?.description || 'No description'
    const level: KataLevel = req?.body?.level || KataLevel.BASIC
    const user: string = req?.body?.user
    const date: Date = req?.body?.date || Date.now()
    const solution: string = req?.body?.solution
    const valoration: Number = 0
    const chance: Number = 0
    const numVal: Number = 0
    const ratings: [] = []

    if (name && description && level && user && date && solution) {
      // Controller Instance to execute method
      const controller: KataController = new KataController()

      const newKata: IKata = {
        name,
        description,
        level,
        user,
        date,
        solution,
        valoration,
        chance,
        numVal,
        ratings
      }

      // Obtain Response
      const response: any = await controller.createKata(newKata)
      // Send to the client the response
      return res.status(200).send(response)
    } else {
      return res.status(400).send({
        message: '[ERROR]: Creating Kata. You need to send all attrs of Kata to update it'
      })
    }
  })

  // DELETE:
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain a Query Param
    const kataId: any = req?.query?.kataId
    const userId: any = req?.query?.userId

    if (!kataId || !userId) {
      return res.status(400).send({
        message: '[ERROR]: Deleting Kata. You have to provide an Kata ID and User ID'
      })
    }
    // Controller Instance to execute method
    const controller: KataController = new KataController()
    // Obtain Response
    const response: any = await controller.deleteKataById(kataId, userId)
    // Send to the client the response
    return res.status(200).send(response)
  })

  // PUT:
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Params
    const kataId: any = req?.query?.kataId
    const userId: any = req?.query?.userId

    // Obtain Body Params
    const name: string = req?.body?.name
    const rating: number = req?.body?.rating

    const description: string = req?.body?.description
    const level: KataLevel = req?.body?.level
    const solution: string = req?.body?.solution

    const controller: KataController = new KataController()
    if (name && rating >= 0) {
      if (rating < 0 || rating > 5) {
        return res.status(400).send({
          message: '[ERROR]: Updating Kata. Rating has to be a number between 0 and 5 both included'
        })
      } else {
        const update = {
          name,
          rating
        }

        const response: any = await controller.newKataValoration(kataId, update)

        return res.send(response)
      }
    } else if (!name && !description && !level && !solution) {
      return res.status(400).send({
        message: '[ERROR]: Updating Kata. Please provide at least one parameter to update'
      })
    } else {
      let update: any = {
        name,
        description,
        level,
        solution
      }

      if (!update.name) {
        delete update.name
      }

      if (!update.description) {
        delete update.description
      }

      if (!update.level) {
        delete update.level
      }

      if (!update.solution) {
        delete update.solution
      }

      const response: any = await controller.updateKata(kataId, userId, update)

      return res.send(response)
    }
  })

katasRouter.route('/solution')
  .get(jsonParser, verifyToken, async (req: Request, res: Response) => {
    // Obtain query paramns
    const id: any = req?.query?.id

    // Obtain body params
    const solution: any = req?.body?.solution

    const controller: KataController = new KataController()

    const response: any = await controller.getKataSolution(id, solution)

    return res.send(response)
  })

export default katasRouter
