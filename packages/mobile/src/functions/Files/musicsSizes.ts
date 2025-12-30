import store from '@/store'
import { IDBState } from '@/store/interfaces'
import { CheckFileSize } from './checkFileSize'

export const MusicsSizes = () => {
  const musicsDB = (store.getState().db as IDBState).musics
  const arrMusicsOnDevice = musicsDB.filter(
    value => value.location === 'device',
  )
  let total = 0
  arrMusicsOnDevice.map(({ sound }) => {
    total += CheckFileSize(sound) as number
  })
  return total
}
