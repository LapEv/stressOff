import { ISoundStateItems } from '@/store/interfaces'
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'

export interface ILibrary {
  width: number
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
  favesLength: number
  itemColor: string
  title: string
}

export interface IPlayerContainer {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export interface IPlayerControlContainer {
  setStatusPlay: (data: boolean) => void
  play: boolean
  disabledControl: boolean
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
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
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
  favorite: boolean
  setFavorite: (data: boolean) => void
}

export interface IPlayerTimer {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
  disabledControl: boolean
}

export interface IListHeader {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
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
