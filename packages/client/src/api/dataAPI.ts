import {
  emptyCategoryMusic,
  emptyCategorySound,
  emptyMessages,
  emptyMusic,
  emptyNotification,
  emptyRequests,
  emptyUsers,
} from './../store/data'
import { authFileHost, authhost } from 'api'
import { api } from './api'
import { emptySound } from 'store/data'
import { IListFiles, IObject, IObject_, IObjectFile } from './interfaces'
import { ICurrentCategoryObjSave, ICurrentObjSave } from 'store/Data/interfaces'

export const getData = async (API: string) => {
  const { data } = await authhost.get(API)
  return data
}

export const LoadData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const soundDB = await getData(api.GET_DATA_SOUNDS)
      soundDB.unshift(emptySound[0])
      const musicDB = await getData(api.GET_DATA_MUSICS)
      musicDB.unshift(emptyMusic[0])
      const soundCategoriesDB = await getData(api.GET_DATA_SOUNDCATEGORIES)
      soundCategoriesDB.unshift(emptyCategorySound[0])
      const musicCategoriesDB = await getData(api.GET_DATA_MUSICCATEGORIES)
      musicCategoriesDB.unshift(emptyCategoryMusic[0])
      const notificationDB = await getData(api.GET_DATA_NOTIFICATIONS)
      notificationDB.unshift(emptyNotification[0])
      const requestDB = await getData(api.GET_DATA_REQUESTS)
      requestDB.unshift(emptyRequests[0])
      const messagesDB = await getData(api.GET_DATA_MESSAGES)
      messagesDB.unshift(emptyMessages[0])
      const usersDB = await getData(api.GET_DATA_USERS)
      usersDB.unshift(emptyUsers[0])

      const rolesDB = await getData(api.GET_DATA_ROLES)
      const response = await getListFiles()
      const listFiles = response.data.list.map(
        (value: IListFiles) => value.file,
      )
      const sizeImages = response.data.list
        .map((value: IListFiles) =>
          value.file.indexOf('\\img') === 0 ? value.size : null,
        )
        .reduce((partialSum: string, a: string) => partialSum + a, 0)
      const sizeSounds = response.data.list
        .map((value: IListFiles) =>
          value.file.indexOf('\\sound') === 0 ? value.size : null,
        )
        .reduce((partialSum: string, a: string) => partialSum + a, 0)
      const data = {
        soundDB,
        musicDB,
        soundCategoriesDB,
        musicCategoriesDB,
        notificationDB,
        requestDB,
        messagesDB,
        usersDB,
        rolesDB,
        listFiles,
        sizeImages,
        sizeSounds,
      }
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

export const saveData = async (
  API: string,
  object: ICurrentObjSave | ICurrentCategoryObjSave,
) => {
  const { data } = await authhost.post(API, object)
  return data
}

export const updateData = async (API: string, object: { _id: string }) => {
  const { data } = await authhost.post(API, object)
  return data
}

export const deleteData = async (API: string, object: { _id: string }) => {
  const { data } = await authhost.delete(API, { data: object })
  return data
}

export const uploadFile = async (
  API: string,
  file: File,
  object: IObjectFile,
) => {
  const formData = new FormData()
  formData.append('files', file, file.name)
  formData.append('name', file.name)
  formData.append('path', object.path as string)
  formData.append('type', object.type)
  formData.append('category', object.category)
  formData.append('directory', object.directory)
  const { data } = await authFileHost.post(API, formData)
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

export const getListFiles = async () => {
  const response = await authhost.get(api.GET_LISTFILE)
  return response
}

export const createNewFolder = async (object: IObject_) => {
  const { data } = await authhost.post(api.CREATE_FOLDER, object)
  return data
}
