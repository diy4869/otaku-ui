import axios, { Method } from 'axios'


export function createServer (URL: string, method: Method) {
  const http = axios({
    url: URL,
    method
  })

  return http
}