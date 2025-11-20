import { DataStore } from 'store'

export interface IImagesList {
  data?: DataStore
  type: string
  obj: string
  tabIndex: number
}

export interface IFileImage {
  status: boolean
  data: IFile
}

export interface IFile {
  data: string
  info: File
}

export interface IUploadFile {
  data: File
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
  list?: IList[]
  getFileImg?: (value: string) => void
  getFileSound?: (value: string) => void
  required?: boolean
  tabIndex?: number
  placeholder?: string
  label?: string
  id: string
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

export interface IButtonsGroup {
  request: string
}

export interface ISoundList {
  type: string
  tabIndex: number
}

export interface IFileData {
  status: string
  data: string
}

export interface IList {
  [x: string]:
    | string
    | number
    | boolean
    | {
        RUS: string
        ENG: string
      }
  id: number
}
