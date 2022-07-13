/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import { LogInfo } from '../utils/logger'

// Server instance
const server = express()

// Router instance
const rootRouter = express.Router()

// Activate for request to http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api/')
  res.send('Welcome to my API Restful')
})

// Redirections to Routers & Controllers
server.use('/', rootRouter) // http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello
// Add more routes to the app

export default server
