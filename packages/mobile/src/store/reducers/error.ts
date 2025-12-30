import { Reducer } from 'react'
import { ADD_ERROR } from '../types'
import { IActionError, IError } from '../interfaces'

const initialState = {
  status: 0,
  message: '',
}

export const errorReducer: Reducer<IError, IActionError> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
