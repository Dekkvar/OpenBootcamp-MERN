import { BasicResponse, GoodbyeResponse } from '../types'

export interface IHelloController {
  getMessage(name?:string): Promise<BasicResponse>
}

export interface IGoodbyeController {
  getMessage(name?:string): Promise<GoodbyeResponse>
}

export interface IUserController {
  // Read all users from database || get User By ID
  getUsers(id?: string): Promise<any>
  // Delete User by ID
  deleteUser(id?: string): Promise<any>
  // Create new User
  createUser(user: any): Promise<any>
  // Update User
  updateUser(id: string, user: any): Promise<any>
}

export interface IKataController {
  // Read all katas from database || get Katas by parameter
  getKatas(level?: number, last?: string, rated?: string, chance?: string): Promise<any>
  // Update Kata
  updateKata(id: string, update: any): Promise<any>
}
