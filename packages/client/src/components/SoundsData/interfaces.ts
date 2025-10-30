import { INewFilteredObj } from 'hooks/interfaces'
import { DataStore } from 'store'

export interface IImagesList {
  data?: DataStore
  type: string
  obj: string
  tabIndex: number
}

export interface IFileImage {
  status: boolean
  data: string | File
}

export interface IFile {
  data: string | File
  info: {
    name: string
  }
}

export interface IDropDownData {
  type: string
  styleinputGroup?: Record<string, unknown>
  style?: Record<string, unknown>
  containerwidth: Record<string, unknown>
  main: string
  optional?: string
  list?: any
  getFileImg?: (value: string) => void
  getFileSound?: (value: string) => void
  required?: boolean
  tabIndex?: number
  placeholder?: string
  label?: string
}

export interface IItem {
  name: string
}

export interface ICategoryList {
  type: string
}

export interface ISoundsModule {
  type: string
}

export interface ISoundList {
  type: string
  tabIndex: number
}

export interface IFileData {
  status: string
  data: string
}
