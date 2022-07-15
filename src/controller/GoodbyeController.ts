import { GoodbyeResponse } from './types'
import { IGoodbyeController } from './interfaces'
import { LogSuccess } from '../utils/logger'
import { Get, Query, Route, Tags } from 'tsoa'

@Route('/api/goodbye')
@Tags('GoodbyeController')
export class GoodbyeController implements IGoodbyeController {
  /**
   * Endpoint to retreive a Message "Goodbye {name}" in JSON
   * @param name Name of user to say goodbye
   * @returns Promise of GoodbyeResponse
   */
  @Get('/')
  public async getMessage (@Query()name?: string): Promise<GoodbyeResponse> {
    LogSuccess('[/api/goodbye] Get Request')

    return {
      message: `Goodbye ${name || 'Anonimous'}`,
      date: new Date().toDateString()
    }
  }
}
