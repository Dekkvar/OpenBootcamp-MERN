import dotenv from 'dotenv'
import server from './src/server'
import { LogSuccess, LogError } from './src/utils/logger'

// Configuration .env file
dotenv.config()

const port: string | number = process.env.PORT || 8000

// Execute SERVER and Listen Requests to PORT
server.listen(port, () => {
  LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`)
})

// Control SERVER ERROR
server.on('error', (error: any) => {
  LogError(`[SERVER ERROR]: ${error}`)
})
