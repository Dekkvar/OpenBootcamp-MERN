export enum KataLevel {
  BASIC = 'Basic',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface IKata {
  name: String,
  description: String,
  level: KataLevel,
  user: string, // Id of user
  date: Date,
  solution: string,
  valoration: Number,
  chance: Number,
  numVal: Number,
  ratings: Object
}
