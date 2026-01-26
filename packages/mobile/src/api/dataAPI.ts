import { authhost } from '.'
import { api } from './api'
import { IObject, IUpdateStatusSound } from './interfaces'

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

export const updateStatusSound = async ({
  _id,
  newSound,
  userID,
}: IUpdateStatusSound) => {
  const { data } = await authhost.post(api.UPDATE_SOUND_STATUS_NEW, {
    _id,
    newSound,
    userID,
  })
  return data
}

export const updateStatusMusic = async ({
  _id,
  newSound,
  userID,
}: IUpdateStatusSound) => {
  const { data } = await authhost.post(api.UPDATE_MUSIC_STATUS_NEW, {
    _id,
    newSound,
    userID,
  })
  return data
}
