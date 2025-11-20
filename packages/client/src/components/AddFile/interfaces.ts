import { IFile, IFileImage } from 'pages/Sounds/SoundsData/interfaces'

export interface IAddFile {
  accept?: string
  label: string
  containerwidth: Record<string, unknown>
  tabIndex: number
  obj: string
  onChooseFile: (file: IFileImage) => void
}

export interface IAddFileData {
  data: string | IFile
  info: {
    name: string
  }
}
