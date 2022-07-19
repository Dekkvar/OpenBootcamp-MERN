// ORM es el encargado de gestionar la base de datos

import { userEntity } from '../entities/User.entity'
import { LogError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// JWT
import jwt from 'jsonwebtoken'

// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`)
  }
}

// - Get User by ID
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Search User by ID
    return await userModel.findById({ _id: id })
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

// - Create New User
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create a new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Create User: ${error}`)
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

    userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
      if (err) {
        // TODO return error --> error while seraching (500)
      }

      if (!user) {
        // TODO return error --> error user not found (400)
      }

      // Use BCRYPT to Compare Password
      const validPassword = bcrypt.compareSync(auth.password, user.password)

      if (!validPassword) {
        // TODO return error --> Not authorised (401)
      }

      // Create JWT
      // TODO: Secret must be in .env
      const token = jwt.sign({email: user.email}, 'SECRET', {
        expiresIn: '2h'
      })

      return token
    })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User by ID: ${error}`)
  }
}

// - Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  // TODO Not implemented
}