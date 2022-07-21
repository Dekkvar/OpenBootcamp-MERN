/**
 * Basic JSON response for Controllers
 */
export type BasicResponse = {
  message: string
}

/**
 * Goodbye JSON response for Controllers
 */
export type GoodbyeResponse = {
  message: string,
  date: string
}

/**
 * Error JSON response for Controllers
 */
export type ErrorResponse = {
  error: string,
  message: string
}

/**
 * Auth JSON response for Controllers
 */
export type AuthResponse = {
  message: string,
  token: string
}
