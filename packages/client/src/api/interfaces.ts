export interface IListFiles {
  file: string
  size: string
}

export interface IObject {
  name: string
}

export interface IObjectFile {
  type: string
  path?: string
  category: string
  directory: string
}
