import { ISOUNDS } from '@/store/interfaces'
import { ITheme } from '@/theme/interfaces'

export interface useICategoryFilter {
  data: ISOUNDS[]
  filter: string
}

export interface IUpdateSoundsStatusDB {
  _id: string
  newSound: boolean
}

export interface IUpdateMusicsStatusDB {
  _id: string
  newSound: boolean
}

export interface IUpdateLanguage {
  nameLanguage: string
  _id: string
}

export interface IChangeTheme {
  newTheme: ITheme
  _id: string
}
