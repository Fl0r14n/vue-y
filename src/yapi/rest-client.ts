import axios from 'axios'

export abstract class RestClient {
  http = axios.create({
    baseURL: import.meta.env.VITE_API
  })
}
