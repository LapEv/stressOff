import * as FileSystem from 'expo-file-system/legacy'
import {
  getSoundImages,
  getMusicImages,
  getSoundFile,
  getMusicFile,
} from '@/api/dataAPI'
import { dataApp } from '@/data/dataApp'
import { checkDir } from './checkDir'
import { blobToBase64 } from './blotToBase64'

export const downloadSoundImagesBlob = async (img: string) => {
  try {
    const mainDir = `${FileSystem.cacheDirectory}${dataApp.paths.main}`
    const checkMainDir = await checkDir(mainDir)
    if (!checkMainDir)
      return { status: 'error', uri: '', message: 'error check main Dir' }
    const pathSoundsIMG = `${mainDir}/${dataApp.paths.img.sounds}`
    const checkpathSoundsIMG = await checkDir(pathSoundsIMG)
    if (!checkpathSoundsIMG)
      return { status: 'error', uri: '', message: 'error check Dir sound img' }

    const fullPath = `${pathSoundsIMG}/${img}`
    // await FileSystem.deleteAsync(fullPath)
    const checkFile = await FileSystem.getInfoAsync(fullPath)
    if (checkFile.exists) {
      const uri = await FileSystem.getContentUriAsync(fullPath)
      return { status: 'done', uri, message: '' }
    }

    const file = await getSoundImages(img)
    const base64Data = await blobToBase64(file.data)
    await FileSystem.writeAsStringAsync(fullPath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    })
    await FileSystem.readDirectoryAsync(pathSoundsIMG)
    const uri = await FileSystem.getContentUriAsync(fullPath)
    return { status: 'done', uri, message: '' }
  } catch (e) {
    console.log('downloadSoundImages e = ', e)
    return { status: 'error', uri: '', message: e }
  }
}

export const downloadMusicImagesBlob = async (img: string) => {
  try {
    const mainDir = `${FileSystem.cacheDirectory}${dataApp.paths.main}`
    const checkMainDir = await checkDir(mainDir)
    if (!checkMainDir)
      return { status: 'error', uri: '', message: 'error check main Dir' }
    const pathMusicsIMG = `${mainDir}/${dataApp.paths.img.musics}`
    const checkpathMusicsIMG = await checkDir(pathMusicsIMG)
    if (!checkpathMusicsIMG)
      return { status: 'error', uri: '', message: 'error check Dir music img' }

    const fullPath = `${pathMusicsIMG}/${img}`
    const checkFile = await FileSystem.getInfoAsync(fullPath)
    if (checkFile.exists) {
      const uri = await FileSystem.getContentUriAsync(fullPath)
      return { status: 'done', uri, message: '' }
    }

    const file = await getMusicImages(img)
    const base64Data = await blobToBase64(file.data)
    await FileSystem.writeAsStringAsync(fullPath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const uri = await FileSystem.getContentUriAsync(fullPath)
    return { status: 'done', uri, message: '' }
  } catch (e) {
    console.log('downloadMusicImages e = ', e)
    return { status: 'error', uri: '', message: e }
  }
}

export const downloadSoundsBlob = async (sound: string) => {
  try {
    const mainDir = `${FileSystem.cacheDirectory}${dataApp.paths.main}`
    const checkMainDir = await checkDir(mainDir)
    if (!checkMainDir)
      return { status: 'error', uri: '', message: 'error check main Dir' }
    const pathSounds = `${mainDir}/${dataApp.paths.sound.sounds}`
    const checkPathSound = await checkDir(pathSounds)
    if (!checkPathSound)
      return { status: 'error', uri: '', message: 'error check Dir sound' }

    const fullPath = `${pathSounds}/${sound}`
    const checkFile = await FileSystem.getInfoAsync(fullPath)
    if (checkFile.exists) {
      const uri = await FileSystem.getContentUriAsync(fullPath)
      return { status: 'done', uri, message: '' }
    }

    const file = await getSoundFile(sound)
    const base64Data = await blobToBase64(file.data)
    await FileSystem.writeAsStringAsync(fullPath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const uri = await FileSystem.getContentUriAsync(fullPath)
    return { status: 'done', uri, message: '' }
  } catch (e) {
    console.log('downloadSounds e = ', e)
    return { status: 'error', uri: '', message: e }
  }
}

export const downloadMusicsBlob = async (sound: string) => {
  try {
    const mainDir = `${FileSystem.cacheDirectory}${dataApp.paths.main}`
    const checkMainDir = await checkDir(mainDir)
    if (!checkMainDir)
      return { status: 'error', uri: '', message: 'error check main Dir' }
    const pathMusics = `${mainDir}/${dataApp.paths.sound.musics}`
    const checkPathMusic = await checkDir(pathMusics)
    if (!checkPathMusic)
      return { status: 'error', uri: '', message: 'error check Dir music' }

    const fullPath = `${pathMusics}/${sound}`
    const checkFile = await FileSystem.getInfoAsync(fullPath)
    if (checkFile.exists) {
      const uri = await FileSystem.getContentUriAsync(fullPath)
      return { status: 'done', uri, message: '' }
    }

    const file = await getMusicFile(sound)
    const base64Data = await blobToBase64(file.data)
    await FileSystem.writeAsStringAsync(fullPath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    })
    const uri = await FileSystem.getContentUriAsync(fullPath)
    return { status: 'done', uri, message: '' }
  } catch (e) {
    console.log('downloadMusics e = ', e)
    return { status: 'error', uri: '', message: e }
  }
}
