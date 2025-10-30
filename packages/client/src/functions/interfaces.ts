import { IActiveObj, INOTIFICATIONS } from 'store/Data/interfaces'

export interface IPrepareDataDelete {
  api: string
  emptyObject: IActiveObj
  deleteData: () => void
}

export interface IPrepareDataSave {
  api: string
  object: IActiveObj
  addData: (newObject: INOTIFICATIONS) => void
  uploadImage: any
  uploadSound: any
}

export interface IPrepareDatUpdate {
  api: string
  updateData: any
}
