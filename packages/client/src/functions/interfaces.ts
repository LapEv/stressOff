import {
  IActiveCategoryObj,
  IActiveObj,
  ICurrentCategoryObj,
  ICurrentObj,
  INOTIFICATIONS,
} from 'store/Data/interfaces'

export interface IPrepareDataDelete {
  api: string
  emptyObject: IActiveObj
  deleteData: () => void
}

export interface IPrepareDataSave {
  api: string
  object: (
    | IActiveObj
    | ICurrentObj
    | IActiveCategoryObj
    | ICurrentCategoryObj
  ) &
    INOTIFICATIONS
  addData: (newObject: INOTIFICATIONS) => void
  uploadImage: any
  uploadSound: any
  uploadImageStorage: any
  uploadImageStorage_lt: any
}

export interface IPrepareDatUpdate {
  api: string
  updateData: any
}

export interface IAxiosError {
  message: {
    RUS: string
    ENG: string
  }
}
