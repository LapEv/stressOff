import { ISOUNDSFB } from '@/store/interfaces'
import { downloadMusicsBlob, downloadSoundsBlob } from './downloadFiles'

export const syncSoundDownload = async (arr: ISOUNDSFB[]) => {
  const newArr = []
  for (const item of arr) {
    const checkFileSound =
      item.location === 'app' || item.location === 'device'
        ? await downloadSoundsBlob(item.storage)
        : { status: 'error', uri: '', message: '' }
    const sound = checkFileSound.status === 'done' ? checkFileSound.uri : ''
    newArr.push({ ...item, sound })
  }
  return newArr
}

export const syncMusicDownload = async (arr: ISOUNDSFB[]) => {
  const newArr = []
  for (const item of arr) {
    console.log('Music item = ', item.name)
    const checkFileSound =
      item.location === 'app' || item.location === 'device'
        ? await downloadMusicsBlob(item.storage)
        : { status: 'error', uri: '', message: '' }
    const sound = checkFileSound.status === 'done' ? checkFileSound.uri : ''
    newArr.push({ ...item, sound })
  }
  return newArr
}
