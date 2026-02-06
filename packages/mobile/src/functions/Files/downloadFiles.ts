import { dataApp } from '@/data/dataApp'
import { Directory, File, Paths } from 'expo-file-system'
import store from '@/store'
import { IConnect } from '@/store/interfaces'
import * as SecureStore from 'expo-secure-store'
import { IDownLoadFiles } from '../interfaces'

export const downLoadImages = async ({
  type,
  category,
  storage,
}: IDownLoadFiles) => {
  try {
    const mainDir = new Directory(Paths.cache, dataApp.paths.main)
    if (!mainDir.exists) {
      mainDir.create()
    }
    const destination = new Directory(`${mainDir.uri}img`)
    if (!destination.exists) {
      destination.create()
    }
    const checkFile = new File(`${mainDir.uri}img/${storage}`)
    if (checkFile.exists) return checkFile.uri
    const pathServer_ = (store.getState().connect as IConnect).pathServer
    const token =
      store.getState().token ?? (await SecureStore.getItemAsync('token'))
    const serverDir = process.env.EXPO_PUBLIC_FILE_DIR
    const url = `${pathServer_}/${serverDir}/img/${type}/${category}/${storage}`
    const { exists, uri } = await File.downloadFileAsync(url, destination, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (exists) return uri
  } catch (e) {
    console.log('downLoadImages error = ', e)
  }
}

export const downLoadSounds = async ({
  type,
  category,
  storage,
}: IDownLoadFiles) => {
  try {
    const mainDir = new Directory(Paths.cache, dataApp.paths.main)
    if (!mainDir.exists) {
      mainDir.create()
    }
    const destination = new Directory(`${mainDir.uri}sound`)
    if (!destination.exists) {
      destination.create()
    }
    const checkFile = new File(`${mainDir.uri}sound/${storage}`)
    if (checkFile.exists) return checkFile.uri
    const pathServer_ = (store.getState().connect as IConnect).pathServer
    const token =
      store.getState().token ?? (await SecureStore.getItemAsync('token'))
    const serverDir = process.env.EXPO_PUBLIC_FILE_DIR
    const url = `${pathServer_}/${serverDir}/sounds/${type}/${category}/${storage}`
    console.log('url = ', url)
    const { exists, uri } = await File.downloadFileAsync(url, destination, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('uri = ', uri)
    if (exists) return uri
    return ''
  } catch (e) {
    console.log('downLoadSounds error = ', e)
  }
}
