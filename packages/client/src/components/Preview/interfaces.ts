export interface IPreview {
  style?: Record<string, unknown>
  styleContainer?: Record<string, unknown>
  file: IFile
  clContainer?: string
}

export interface IFile {
  data: string
  info: Blob
}
export interface IPreviewNewFile {
  style?: Record<string, unknown>
  styleContainer?: Record<string, unknown>
}
