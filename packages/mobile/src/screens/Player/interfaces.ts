import { NavigationPropPlayer } from '@/navigations'
import { ISoundStateItems } from '@/store/interfaces'

export interface ILibrary {
  width: number
  navigation: NavigationPropPlayer
  favesLength: number
  itemColor: string
  title: string
}

export interface IPlayerContainer {
  navigation: NavigationPropPlayer
}

export interface IPlayerControlContainer {
  setStatusPlay: (data: boolean) => void
  play: boolean
  disabledControl: boolean
  navigation: NavigationPropPlayer
  favorite: boolean
  setFavorite: (data: boolean) => void
}

export interface IPlayerControl {
  setStatusPlay: (data: boolean) => void
  play: boolean
  disabledControl: boolean
}

export interface IPlayerFavorites {
  disabledControl: boolean
  navigation: NavigationPropPlayer
  favorite: boolean
  setFavorite: (data: boolean) => void
}

export interface IPlayerTimer {
  navigation: NavigationPropPlayer
  disabledControl: boolean
}

export interface IListHeader {
  navigation: NavigationPropPlayer
  playingDataSound: ISoundStateItems[]
}

export interface IMusicItems {
  id: number
  booked?: boolean
}

export interface ISoundsItems {
  item: ISoundStateItems
  booked?: boolean
  id?: number
}

export interface URI {
  uri: string
}

export interface IListFooter {}
