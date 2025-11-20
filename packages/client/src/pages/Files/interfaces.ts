export interface IAddNewFile {
  obj: string
}

export interface IButtonsGroupFile {
  newFolder: (path: string) => void
  obj: string
}

export interface IFileListControl {
  newFolder: (path: string) => void
}

export interface IFile {
  data: string
  info: File
}
