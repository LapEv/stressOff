import { AxiosError } from 'axios'
import { IAxiosError } from './interfaces'

export const errorHandler = (err: AxiosError) => {
  if (err?.response?.data) {
    return err.response.data as IAxiosError
  }
  if (err?.response?.data) {
    return err.response.data as IAxiosError
  }
  return `${err.config?.baseURL}${err.config?.url}\n ${err.code}: ${err.message}`
}
