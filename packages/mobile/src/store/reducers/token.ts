import { Reducer } from 'react'
import { ADD_TOKEN } from '../types'
import { IActionToken, IToken } from '../interfaces'

const initialState = {
  token: null,
}

export const tokenReducer: Reducer<IToken, IActionToken> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
