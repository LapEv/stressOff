import store from '@/store'
import { IDBState } from '@/store/interfaces'
import { CheckFileSize } from './checkFileSize'

export const SoundSizes = () => {
  const soundDB = (store.getState().db as IDBState).sounds
  const arrSoundsOnDevice = soundDB.filter(value => value.location === 'device')
  let total = 0
  arrSoundsOnDevice.map(({ sound }) => {
    total += CheckFileSize(sound) as number
  })
  return total
}
