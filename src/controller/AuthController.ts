import { Get, Query, Route, Tags, Delete, Post, Put } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// ORM - Auth Collection
import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser (user: IUser): Promise<any> {
    let response: any = ''

    if (user) {
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Create User: ${user}`)
        response = {
          message: `User creates successfully: ${user.name}`
        }
      })
    } else {
      LogWarning('[/api/auth/register] Register needs User Entity')
      response = {
        message: 'Please, provide a User to create one'
      }
    }
    return response
  }

  @Post('/login')
  public async loginUser (auth: IAuth): Promise<any> {
    let response: any = ''

    if (auth) {
      await loginUser(auth).then((r) => {
        LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`)
        response = {
          message: `User Logged In successfully: ${auth.email}`,
          token: r.token // JWT generated for logged in user
        }
      })
    } else {
      LogWarning('[/api/auth/login] Login needs Auth Entity (email && password)')
      response = {
        message: 'Please, provide a email && password to login'
      }
    }

    return response
  }

  @Post('/logout')
  public async logoutUser (auth: any): Promise<any> {
    // TODO: Close session of user
  }
}
