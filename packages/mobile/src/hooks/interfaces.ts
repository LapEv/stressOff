import { IMUSICSDB, ISOUNDSDB } from '@/store/interfaces'
import { ITheme } from '@/theme/interfaces'

export interface useICategoryFilter {
  data: ISOUNDSDB[] | IMUSICSDB[]
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
  name: string
  _id: string
}

export interface IUpdateTheme {
  newTheme: ITheme
  _id: string
}
