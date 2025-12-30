import { Reducer } from 'react'
import { MODAL_SHOW } from '../types'
import { IActionModal, IModal } from '../interfaces'

const initialState = {
  typeMessage: '',
  show: false,
  title: '',
  message: '',
  buttonCancel: '',
  buttonYes: '',
}

export const modalReducer: Reducer<IModal, IActionModal> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case MODAL_SHOW:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
