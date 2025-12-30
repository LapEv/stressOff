export interface IFavorites {
  StateMusic: IStateMusic
  StateSound: IStateMusic
  category: string
  id: number
  name: string
}

export interface IStateMusic {
  booked: boolean
  id: string
  musicStart: boolean
  playing: boolean
  startApp: boolean
  volume: number
}

export interface IStateSound {
  mixedSound: IMixedSounds[]
  musicControl: boolean
  playAll: boolean
  soundStart: boolean
  startApp: boolean
}

export interface IMixedSounds {
  booked: boolean
  id: string
  playing: boolean
  volume: number
}
