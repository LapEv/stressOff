import { AxiosError } from 'axios'

export const errorHandler = (err: AxiosError) => {
  if (err?.response?.data) {
    return err.response.data
  }
  if (err?.response?.data) {
    return err.response.data
  }
  return `${err.config?.baseURL}${err.config?.url}\n ${err.code}: ${err.message}`
}
