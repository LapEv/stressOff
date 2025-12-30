import { Reducer } from 'react'
import { MODAL_SHOW_MESSAGE } from '../types'
import { IActionModalMessage, IModalMessage } from '../interfaces'

const initialState = {
  typeMessage: '',
  show: false,
  title: '',
  message: '',
  buttonCancel: '',
  buttonYes: '',
}

export const modalMessageReducer: Reducer<
  IModalMessage,
  IActionModalMessage
> = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW_MESSAGE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
