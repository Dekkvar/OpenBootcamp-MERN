import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Configuration the .env file
dotenv.config()

// Create Express App
const app: Express = express()
const port: string | number = process.env.PORT || 8000

// Create an App Route
app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to my API Restful: Express + TS + Swagger + Mongoose')
})

// Execute APP and Listen Requests to PORT
app.listen(port, () => {
  console.log(`EXPRESS SERVER: Running at http://localhost:${port}`)
})
