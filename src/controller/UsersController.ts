// Controller: Ejecuta las ordenes del ORM

import { Get, Query, Route, Tags, Delete, Put } from 'tsoa'
import { IUserController } from './interfaces'
import { LogError, LogSuccess, LogWarning } from '../utils/logger'

// ORM - Users Collection
import { getAllUsers, getUserByID, deleteUserByID, updateUserById, getKatasFromUser } from '../domain/orm/User.orm'

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   * Endpoint to retreive the Users in the Collection "Users" of DB
   * @param {string} id Id of user to retreive (optional)
   * @returns All user o user found by ID
   */
  @Get('/')
  public async getUsers (@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Get User By ID: ${id}`)
      response = await getUserByID(id)
    } else {
      LogSuccess('[/api/users] Get All Users Request')
      response = await getAllUsers(page, limit)
    }

    return response
  }

  /**
   * Endpoint to delete a User in the Collection "Users" of DB
   * @param {string} id Id of user to delete (optional)
   * @returns Message information if deletion was correct
   */
  @Delete('/')
  public async deleteUser (@Query()id?: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Delete User By ID: ${id}`)
      await deleteUserByID(id).then((r) => {
        response = {
          message: `User with id ${id} deleted successfully`
        }
      })
    } else {
      LogWarning('[/api/users] Delete User Without ID')
      response = {
        message: 'Please, provide an ID to remove from database'
      }
    }

    return response
  }

  /**
   * Endpoint to update a User in the Collection "Users" of DB
   * @param {string} id User to update
   * @returns Message information if update was correct
   */
  public async updateUser (@Query()id: string, user: any): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Update User By ID: ${id}`)
      await updateUserById(id, user).then((r) => {
        response = {
          message: `User with id ${id} updated successfully`
        }
      })
    } else {
      LogWarning('[/api/users] Update User Without ID')
      response = {
        message: 'Please, provide an ID to update an existing user'
      }
    }

    return response
  }

  @Get('/katas')
  public async getKatas (@Query()page: number, @Query()limit: number, @Query()id: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users/katas] Get Katas from User: ${id}`)
      response = await getKatasFromUser(page, limit, id)
    } else {
      LogError('[/api/users/katas] Get All Katas from User')
      response = {
        message: 'ID from user is needed'
      }
    }

    return response
  }
}
