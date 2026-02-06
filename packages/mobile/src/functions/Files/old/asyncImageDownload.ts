import { ISOUNDSFB } from '@/store/interfaces'
import {
  downloadSoundImagesBlob,
  downloadMusicImagesBlob,
} from './downloadFiles'

export const asyncSoundImageDownload = async (arr: ISOUNDSFB[]) => {
  const result = (await Promise.all(
    arr.map(async item => {
      const checkFileIMG = await downloadSoundImagesBlob(item.imgStorage)
      const img = checkFileIMG.status === 'done' ? checkFileIMG.uri : ''
      return { ...item, img }
    }),
  )) as ISOUNDSFB[]
  result.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
  return result
}

export const asyncMusicImageDownload = async (arr: ISOUNDSFB[]) => {
  const result = (await Promise.all(
    arr.map(async item => {
      const checkFileIMG = await downloadMusicImagesBlob(item.imgStorage)
      const img = checkFileIMG.status === 'done' ? checkFileIMG.uri : ''
      return { ...item, img }
    }),
  )) as ISOUNDSFB[]
  result.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
  return result
}

export const asyncImagesDownload = async (arr: ISOUNDSFB[]) => {
  const result = (await Promise.all(
    arr.map(async item => {
      const checkFileIMG = await downloadSoundImagesBlob(item.imgStorage)
      const img = checkFileIMG.status === 'done' ? checkFileIMG.uri : ''
      return { ...item, img }
    }),
  )) as ISOUNDSFB[]
  result.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
  return result
}
