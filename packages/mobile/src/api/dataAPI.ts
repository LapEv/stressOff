import { authFileHost, authhost } from '.'
import { api } from './api'
import { IUpdateStatusSound } from './interfaces'

export const getData = async (API: string) => {
  const { data } = await authhost.get(API)
  return data
}

export const getSoundImages = async (fileName: string) => {
  const response = await authFileHost.post(
    api.GET_SOUNDIMAGE_FILE,
    { fileName },
    {
      responseType: 'blob',
    },
  )
  return response
}

export const getMusicImages = async (fileName: string) => {
  const response = await authFileHost.post(
    api.GET_MUSICIMAGE_FILE,
    { fileName },
    {
      responseType: 'blob',
    },
  )
  return response
}

export const getSoundFile = async (fileName: string) => {
  const response = await authFileHost.post(
    api.GET_SOUND_FILE,
    { fileName },
    {
      responseType: 'blob',
    },
  )
  return response
}

export const getMusicFile = async (fileName: string) => {
  const response = await authFileHost.post(
    api.GET_MUSIC_FILE,
    { fileName },
    {
      responseType: 'blob',
    },
  )
  return response
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
