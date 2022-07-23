import { Get, Query, Route, Tags, Delete, Post, Put } from 'tsoa'
import { IKataController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'

// ORM - Katas Collection
import { getAllKatas, getKataByID, deleteKataByID, createKata, updateKataById, getAllKatasByRate, getKataByDifficulty, getLast5Katas, getAllKatasByChance, newKataValoration, getKataSolution } from '../domain/orm/Kata.orm'
import { IKata } from 'src/domain/interfaces/IKata.interface'

@Route('/api/katas')
@Tags('KataController')
export class KataController implements IKataController {
  /**
   * Endpoint to retreive the Katas in the Collection "Katas" of DB
   */
  public async getKatas (page: number, limit: number, id?: string, level?: string, last?: string, rated?: string, chance?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/katas] Get Kata By ID: ${id}`)
      response = await getKataByID(id)
    } else if (level) {
      LogSuccess(`[/api/katas] Get Katas By Difficulty Level ${level}`)
      response = await getKataByDifficulty(page, limit, level)
    } else if (last) {
      LogSuccess('[/api/katas] Get Last 5 Katas')
      response = await getLast5Katas(last)
    } else if (rated) {
      LogSuccess('[/api/katas] Get All Katas By Ratings')
      response = await getAllKatasByRate(page, limit, rated)
    } else if (chance) {
      LogSuccess('[/api/katas] Get All Katas By Chance')
      response = await getAllKatasByChance(page, limit, chance)
    } else {
      LogSuccess('[/api/katas] Get All Katas')
      response = await getAllKatas(page, limit)
    }

    return response
  }

  /**
   * Endpoint to delete a Kata in the Collection "Katas" of DB
   */
  public async createKata (kata: IKata): Promise<any> {
    let response: any = ''

    if (kata) {
      await createKata(kata).then((r) => {
        LogSuccess(`[/api/katas] Create Kata: ${kata.name}`)
        response = {
          message: `Kata created successfully: ${kata.name}`
        }
      })
    } else {
      LogWarning('[/api/katas] Register needs Kata Entity')
      response = {
        message: 'Kata not Registered: Please, provide a Kata to create one'
      }
    }
    return response
  }

  /**
   * Endpoint to delete a Kata in the Collection "Katas" of DB
   * @param {string} id Id of kata to delete (optional)
   * @returns Message information if deletion was correct
   */
  @Delete('/')
  public async deleteKataById (@Query()kataId: string, userId: string): Promise<any> {
    let response: any = ''

    response = await deleteKataByID(kataId, userId)

    return response
  }

  /**
   * Endpoint to update a Kata in the Collection "Katas" of DB
   */
  public async updateKata (id: string, userId: string, update: any): Promise<any> {
    let response: any = ''

    response = await updateKataById(id, userId, update)

    return response
  }

  /**
   * Endpoint to create a new Kata valoration in the Collection "Katas" of DB
   */
  public async newKataValoration (@Query()id: string, update: any): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/katas] Update Kata By ID: ${id}`)
      await newKataValoration(id, update).then((r) => {
        response = {
          message: `Kata with id ${id} have a new valoration`
        }
      })
    } else {
      LogWarning('[/api/katas] Update Kata Without ID')
      response = {
        message: 'Please, provide an ID to update an existing user'
      }
    }

    return response
  }

  /**
   * Endpoint to obtain the Kata Solution
   */
  public async getKataSolution (id: string, solution: string): Promise<any> {
    let response: any = ''

    if (solution) {
      LogSuccess(`[/api/katas] Solution from Kata: ${id}`)
      response = await getKataSolution(id)
    } else {
      LogWarning('[/api/katas] Solution error')
      response = {
        message: 'Please, provide a solution'
      }
    }

    return response
  }
}
