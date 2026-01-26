import { ISoundStateItems, IUser } from '@/store/interfaces'

export interface ICurrentPlay {
  sound: ICurrentPlaySound
  music: ICurrentPlayMusic
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
