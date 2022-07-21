import { Get, Query, Route, Tags, Delete, Post, Put } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { AuthResponse, ErrorResponse } from './types'

// ORM - Auth Collection
import { registerUser, loginUser, logoutUser, getUserByID } from '../domain/orm/User.orm'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser (user: IUser): Promise<any> {
    let response: any = ''

    if (user) {
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Create User: ${user.email}`)
        response = {
          message: `User creates successfully: ${user.name}`
        }
      })
    } else {
      LogWarning('[/api/auth/register] Register needs User Entity')
      response = {
        message: 'User not Registered: Please, provide a User to create one'
      }
    }
    return response
  }

  @Post('/login')
  public async loginUser (auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined

    if (auth) {
      let data = await loginUser(auth)
      response = {
        token: data.token,
        message: `Welcome, ${data.user.name}`
      }
    } else {
      LogWarning('[/api/auth/login] Login needs Auth Entity (email && password)')
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a email && password to login'
      }
    }

    return response
  }

  /**
   * Endpoint to retreive the User in the Collection 'Users' of DB
   * Middleware: Validate JWT
   * In headers you must add the x-access-token with a valid JWT
   * @param id Id of user to retreive
   * @returns user found by Id
   */
  @Get('/me')
  public async userData (@Query()id: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/auth/me] Get User Data By ID: ${id}`)
      response = await getUserByID(id)
    }

    return response
  }

  @Post('/logout')
  public async logoutUser (auth: any): Promise<any> {
    // TODO: Close session of user
  }
}
