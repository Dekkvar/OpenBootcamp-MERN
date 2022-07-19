import { Get, Query, Route, Tags, Delete, Post, Put } from 'tsoa'
import { IKataController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'

// ORM - Katas Collection
import { getAllKatas, getAllKatasByRate, getKataByDifficulty, getLast5Katas, getAllKatasByChance, newValoration } from '../domain/orm/Kata.orm'

@Route('/api/katas')
@Tags('KataController')
export class KataController implements IKataController {
  /**
   * Endpoint to retreive the Katas in the Collection "Katas" of DB
   */
  @Get('/')
  public async getKatas (level?: number, last?: string, rated?: string, chance?: string): Promise<any> {
    let response: any = ''

    if (level) {
      LogSuccess(`[/api/katas] Get Katas By Difficulty Level ${level}`)
      response = await getKataByDifficulty(level)
    } else if (last) {
      LogSuccess('[/api/katas] Get Last 5 Katas')
      response = await getLast5Katas(last)
    } else if (rated) {
      LogSuccess('[/api/katas] Get All Katas By Ratings')
      response = await getAllKatasByRate(rated)
    } else if (chance) {
      LogSuccess('[/api/katas] Get All Katas By Chance')
      response = await getAllKatasByChance(chance)
    } else {
      LogSuccess('[/api/katas] Get All Katas')
      response = await getAllKatas()
    }

    return response
  }

  /**
   * Endpoint to update the Katas in the Collection "Katas" of DB
   */
  @Put('/')
  public async updateKata (@Query()id: string, update: any): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/katas] Update Kata By ID: ${id}`)
      await newValoration(id, update).then((r) => {
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
}
