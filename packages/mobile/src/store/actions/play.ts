import { IPlay_ID, IPlayAll, ISoundStateItemsAction } from '../interfaces'
import { ADD_SOUND, REMOVE_SOUND, TOGGLE_ALL_SOUND } from '../types'

export const AddSound = (sound: ISoundStateItemsAction) => {
  return {
    type: ADD_SOUND,
    payload: sound,
  }
}

export const RemoveSound = (sound: IPlay_ID) => {
  return {
    type: REMOVE_SOUND,
    payload: sound,
  }
}

export const ToggleAllSound = (data: IPlayAll) => {
  return {
    type: TOGGLE_ALL_SOUND,
    payload: data,
  }
}
