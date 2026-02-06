import { ISoundStateItems, IUser } from '@/store/interfaces'
import { ImageSourcePropType } from 'react-native'

export interface ICurrentPlay {
  soundsPlay: ICurrentPlaySound
  musicPlay: ICurrentPlayMusic
  favorites: ICurrentPlayFavorites
  startApp: boolean
}

export interface ICurrentPlaySound {
  mixedSound: ISoundStateItems[]
  playAll: boolean
  soundStart: boolean
  startApp: boolean
  musicControl: boolean
  volume: number
  playing: boolean
}

export interface ICurrentPlayMusic {
  _id: string
  id: number
  playing: boolean
  volume: number
  musicStart: boolean
  img: ImageSourcePropType
}

export interface ICurrentPlayFavorites {
  currentMix: string
  _id: string
}

export interface IBootstrapResult {
  status: boolean
  newError: string
}

export interface IBootstrap {
  isConnected?: boolean
  token?: string | null
  user?: IUser | undefined
}

export interface IDownLoadFiles {
  type: string
  category: string
  storage: string
}
