const PORT = 4321
const HOST = 'localhost'
const PROTOCOL = 'http'

export const Server = {
  PORT,
  HOST,
  PROTOCOL,
  BASE_URL: `${PROTOCOL}://${HOST}:${PORT}`,
}
