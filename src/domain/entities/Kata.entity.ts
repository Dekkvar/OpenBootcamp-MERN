import mongoose, { Schema } from 'mongoose'

export const kataEntity = () => {
  const kataSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
      level: Number,
      user: { type: Schema.Types.ObjectId, ref: 'Users' },
      date: { type: Date, default: Date.now },
      valoration: { type: Number, min: 0, max: 5 },
      chance: Number,
      numVal: { type: Number, default: 0 },
      ratings: { type: Object }
    }
  )

  return mongoose.models.Katas || mongoose.model('Katas', kataSchema)
}
