import { AxiosError } from 'axios'

export interface Error {
  response: {
    data?: {
      message?: string
      error?: AxiosError
    }
  }
  config?: {
    baseURL?: string
    url?: string
  }
  code?: string
  message?: string
}

export interface IAxiosError {
  message: {
    RUS: string
    ENG: string
  }
}
