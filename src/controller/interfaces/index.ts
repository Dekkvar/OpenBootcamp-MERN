import { IKata } from '../../domain/interfaces/IKata.interface'
import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse, GoodbyeResponse } from '../types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasicResponse>
}

export interface IGoodbyeController {
  getMessage(name?:string): Promise<GoodbyeResponse>
}

export interface IUserController {
  // Read all users from database || get User By ID
  getUsers(page: number, limit: number, id?: string): Promise<any>
  // Get Katas of User
  getKatas(page: number, limit: number, id?: string): Promise<any>
  // Delete User by ID
  deleteUser(id?: string): Promise<any>
  // Update User
  updateUser(id: string, user: any): Promise<any>
}

export interface IKataController {
  // Read all katas from database || get Katas by parameter
  getKatas(page: number, limit: number, id?: string, level?: string, last?: string, rated?: string, chance?: string): Promise<any>
  // Delete Kata by ID
  deleteKataById(id?: string): Promise<any>
  // Create New Kata
  createKata(kata: IKata): Promise<any>
  // Update Kata
  updateKata(id: string, update: any): Promise<any>
}

export interface IAuthController {
  // Register user
  registerUser(user: IUser): Promise<any>
  // Login user
  loginUser(auth: any): Promise<any>
}
