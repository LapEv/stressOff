import { authhost } from '.'
import { api } from './api'
import { IObject } from './interfaces'

export const getData = async (API: string) => {
  const { data } = await authhost.get(API)
  return data
}

export const getFile = async (object: IObject) => {
  const response = await authhost.post(api.GET_FILE, object, {
    responseType: 'blob',
  })
  return {
    data: window.URL.createObjectURL(new Blob([response.data])),
    info: response.data,
  }
}
