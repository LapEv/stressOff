import { IPlayAll, IPlay_ID, ISoundStateItemsAction } from '@/store/interfaces'

export interface IPlayActions {
  ToggleAllSound: (data: IPlayAll) => void
  AddSound: (data: ISoundStateItemsAction) => void
  RemoveSound: (data: IPlay_ID) => void
}
