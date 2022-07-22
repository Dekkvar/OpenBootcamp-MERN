// ORM es el encargado de gestionar la base de datos

import { userEntity } from '../entities/User.entity'
import { LogError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import { UserResponse } from '../types/UsersResponse.types'

// Environment variables
import dotenv from 'dotenv'

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// JWT
import jwt from 'jsonwebtoken'
import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/IKata.interface'
import mongoose from 'mongoose'

// Configuration of enviroment variables
dotenv.config()

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    const response: any = {}

    // Search all users (using pagination)
    await userModel.find({ isDeleted: false })
      .select('name email age katas')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((users: IUser[]) => {
        response.users = users
      })

    // Count total documents in collection "Users"
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`)
  }
}

// - Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Search User by ID
    return await userModel.findById({ _id: id }).select('name email age katas')
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User by ID: ${error}`)
  }
}

// - Delete User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Delete User
    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User by ID: ${error}`)
  }
}

// - Update User By ID
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Update User
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User ${id}: ${error}`)
  }
}

// - Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create a new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Registering User: ${error}`)
  }
}

// - Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    let userFound: IUser | undefined
    let token

    // Check if user exists by Unique Email
    await userModel.findOne({ email: auth.email }).then((user: IUser) => {
      userFound = user
    }).catch((error) => {
      console.error('[ERROR Authentication in ORM]: User Not Found')
      throw new Error(`[ERROR Authentication in ORM]: User Not Found: ${error}`)
    })

    // Check if Password is Valid (Compare with bcrypt)
    const validPassword = bcrypt.compareSync(auth.password, userFound!.password)

    if (!validPassword) {
      console.error('[ERROR Authentication in ORM]: Password Not Valid')
      throw new Error('[ERROR Authentication in ORM]: Password Not Valid')
    }

    // Generate our JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h'
    })

    return {
      user: userFound,
      token
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User by ID: ${error}`)
  }
}

// - Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO Not implemented
}

/**
 * Method to obtain all Katas from an User
 */
export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()
    const katasModel = kataEntity()

    // eslint-disable-next-line prefer-const
    let response: any = {}

    await userModel.findById(id).then(async (user: IUser) => {
      response.userName = user.name

      await katasModel.find({ _id: { $in: user.katas } }).then(async (katas: IKata[]) => {
        response.katas = katas
      })
    }).catch((error) => {
      LogError(`[ORM ERROR]: Obtaining User: ${error}`)
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`)
  }
}
