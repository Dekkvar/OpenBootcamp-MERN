import dotenv from 'dotenv'
import server from '@/server'
import { LogSuccess, LogError } from '@/utils/logger'

// Configuration .env file
dotenv.config()

const port: string | number = process.env.PORT || 8000

// Execute SERVER and Listen Requests to PORT
server.listen(port, () => {
  LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`)
})

// Control SERVER ERROR
server.on('error', (error) => {
  LogError(`[SERVER ERROR]: ${error}`)
})
