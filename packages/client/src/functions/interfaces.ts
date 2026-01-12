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
  uploadImage?: (info: { type: string }) => Promise<void>
  uploadSound?: (info: { type: string }) => Promise<void>
  uploadImageStorage?: (info: { type: string }) => Promise<void>
  uploadImageStorage_lt?: (info: { type: string }) => Promise<void>
}

export interface IPrepareDatUpdate {
  api: string
  updateData: () => Promise<void>
}

export interface IAxiosError {
  message: {
    RUS: string
    ENG: string
  }
}
