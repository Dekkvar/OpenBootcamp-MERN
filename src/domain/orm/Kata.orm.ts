/* eslint-disable no-trailing-spaces */
import { LogError } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.entity'
import { IKata } from '../interfaces/IKata.interface'

// CRUD

/**
 * Method to obtain all katas from Collection "katas" in MongoDB server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()
    
    let response: any = {}

    await kataModel.find().limit(limit).skip((page - 1) * limit).then((katas: IKata[]) => {
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

/**
 * Method to obtain the Katas by difficulty level from Collection "katas" in Mongo Server
 */
export const getKataByDifficulty = async (page: number, limit: number, level: number): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    let response: any = {}

    await kataModel.find({ level }).limit(limit).skip((page - 1) * limit).then((katas: IKata[]) => {
      response.katas = katas
    })

    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit)
      response.currentPage = page
    })

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
export const newValoration = async (id: string, update: any): Promise<any | undefined> => {
  try {
    const kataModel = kataEntity()

    // Comprobar si ya existe una valoración del usuario y actualizar el valor
    const dataToUpdate = await kataModel.findOne({ _id: id }, { _id: 0, valoration: 1, numVal: 1, ratings: 1 })

    dataToUpdate.ratings[update.name] = Number(update.rating)
    dataToUpdate.numVal++
    dataToUpdate.valoration = Object.values(dataToUpdate.ratings).reduce((acc: any, curr: any) => acc + curr)
    dataToUpdate.valoration = dataToUpdate.valoration / Object.keys(dataToUpdate.ratings).length

    return await kataModel.findOneAndUpdate({ _id: id }, dataToUpdate)
  } catch (error) {
    LogError(`[ORM ERROR]: Adding new valoration: ${error}`)
  }
}
