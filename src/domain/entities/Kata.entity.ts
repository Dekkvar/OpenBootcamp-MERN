import mongoose, { Schema } from 'mongoose'
import { IKata } from '../interfaces/IKata.interface'

export const kataEntity = () => {
  const kataSchema = new mongoose.Schema<IKata>(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      level: { type: String, required: true },
      user: { type: String, required: true },
      date: { type: Date, default: Date.now },
      solution: { type: String, required: true },
      valoration: { type: Number, min: 0, max: 5 },
      chance: { type: Number, required: true },
      numVal: { type: Number, default: 0 },
      ratings: { type: [], required: true }
    }
  )

  return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema)
}
