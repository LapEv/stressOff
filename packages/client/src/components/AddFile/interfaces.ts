export interface IAddFile {
  accept?: string
  label: string
  containerwidth: Record<string, unknown>
  tabIndex: number
  obj: string
  onChooseFile: (file: IAddFileData) => void
}

export interface IAddFileData {
  data: string | File
  info: {
    name: string
  }
}
