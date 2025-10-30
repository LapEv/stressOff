import { Model, Schema, model } from 'mongoose'

export interface IFiles {
  name: string
  fileType: string
  accessLink: string
  size: number
  path: string
  globalCategory: string
  category: string
}

export type FilesModel = Model<IFiles>

const Files = new Schema<IFiles, FilesModel>({
  name: { type: String, required: true },
  fileType: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  globalCategory: { type: String, required: true },
  category: { type: String, required: true },
})

export const File = model<IFiles, FilesModel>('Files', Files)
