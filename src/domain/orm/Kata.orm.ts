/* eslint-disable eqeqeq */
/* eslint-disable no-trailing-spaces */
import { LogError, LogSuccess } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/IKata.interface'

// CRUD

/**
 * Method to obtain all katas from Collection "katas" in MongoDB server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    const kataModel = kataEntity()
    
    let response: any = {}

    await kataModel.find({ isDeleted: false }).limit(limit).skip((page - 1) * limit).then((katas: IKata[]) => {
      response.katas = katas
    })

    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas: ${error}`)
  }
}

// - Get Kata by ID
export const getKataByID = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    // Search Kata by ID
    return await kataModel.findById({ _id: id })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Kata by ID: ${error}`)
  }
}

// - Delete Kata By ID
export const deleteKataByID = async (id: string, userId: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    const kata = await kataModel.findById(id)

    if (kata.user !== userId) {
      LogError(`[ORM ERROR]: User with id ${id} cannot modify this kata`)
      const response = 'You cannot modify this Kata'
      return response
    } else {
      LogSuccess(`[/api/katas]: Deleted Kata ${id}`)
      return await kataModel.deleteOne({ _id: id })
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting Kata by ID: ${error}`)
  }
}

// - Create New Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    // Create a new Kata
    return await kataModel.create(kata)
  } catch (error) {
    LogError(`[ORM ERROR]: Create Kata: ${error}`)
  }
}

// - Update Kata By ID
export const updateKataById = async (id: string, userId: string, update: any): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    const kata = await kataModel.findById(id)

    if (kata.user !== userId) {
      LogError(`[ORM ERROR]: User with id ${id} cannot modify this kata`)
      const response = 'You cannot modify this Kata'
      return response
    } else {
      LogSuccess(`[/api/katas]: Updating Kata ${id}`)
      return await kataModel.findByIdAndUpdate(id, update)
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`)
  }
}

/**
 * Method to obtain the Katas by difficulty level from Collection "katas" in Mongo Server
 */
export const getKataByDifficulty = async (page: number, limit: number, level: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    let response: any = {}

    if (level === 'Basic' || level === 'Medium' || level === 'High') {
      await kataModel.find({ level }).limit(limit).skip((page - 1) * limit).then((katas: IKata[]) => {
        response.katas = katas
      })
  
      await kataModel.countDocuments().then((total: number) => {
        response.totalPages = Math.ceil(total / limit)
        response.currentPage = page
      })
    } else {
      LogError('[LEVEL ERROR]: The level introduced is incorrect')
      response = 'Incorrect level introduced'
    }

    return response
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Katas by difficulty level: ${error}`)
  }
}

/**
 * Method to obtain the last 5 Katas
 */
export const getLast5Katas = async (last: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    if (last === 'true') {
      return await kataModel.find().sort({ date: -1 }).limit(5)
    } 
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Last 5 Katas: ${error}`)
  }
}

/**
 * Method to obtain all Katas from better to worst rated
 */
export const getAllKatasByRate = async (page: number, limit: number, rated: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    if (rated === 'true') {
      let response: any = {}

      await kataModel.find().sort({ valoration: -1 }).limit(limit).skip((page - 1) * limit).then((katas: IKata[]) => {
        response.katas = katas
      })

      await kataModel.countDocuments().then((total: number) => {
        response.totalPages = Math.ceil(total / limit)
        response.currentPage = page
      })

      return response
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas By Rating: ${error}`)
  }
}

/**
 * Method to obtain all Katas by number of chances
 */
export const getAllKatasByChance = async (page: number, limit: number, chance: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    if (chance === 'true') {
      let response: any = {}

      await kataModel.find().sort({ chance: -1 }).limit(limit).skip((page - 1) * limit).then((katas: IKata[]) => {
        response.katas = katas
      })

      await kataModel.countDocuments().then((total: number) => {
        response.totalPages = Math.ceil(total / limit)
        response.currentPage = page
      })

      return response
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas By Chance: ${error}`)
  }
}

/**
 * Method to update kata valoration
 */
export const newKataValoration = async (id: string, update: any): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    // Comprobar si ya existe una valoración del usuario y actualizar el valor
    const dataToUpdate = await kataModel.findOne({ _id: id }, { _id: 0, valoration: 1, numVal: 1, ratings: 1 })

    const arrId = dataToUpdate.ratings.map((elem: any) => {
      return elem.id
    })

    if (arrId.indexOf(update.name) === -1) {
      dataToUpdate.ratings.push({
        id: update.name,
        rating: update.rating
      })
      dataToUpdate.numVal++
    } else {
      dataToUpdate.ratings[arrId.indexOf(update.name)].rating = update.rating
    }
    
    const arrValoraciones = dataToUpdate.ratings.map((elem: any) => {
      return elem.rating
    })
    dataToUpdate.valoration = (arrValoraciones.reduce((acc: any, curr: any) => acc + curr) / arrValoraciones.length).toFixed(2)

    return await kataModel.findOneAndUpdate({ _id: id }, dataToUpdate)
  } catch (error) {
    LogError(`[ORM ERROR]: Adding new valoration: ${error}`)
  }
}

/**
 * Method to update kata valoration
 */
export const getKataSolution = async (id: string): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    let response = await kataModel.findById(id, { _id: 0, solution: 1 })

    if (response) {
      return response
    } else {
      LogError('[ORM ERROR]: Kata doesnt exist')
      response = {
        message: 'The Kata does not exists'
      }
      return response
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Kata Solution: ${error}`)
  }
}
