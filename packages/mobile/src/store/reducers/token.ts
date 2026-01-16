import { Reducer } from 'react'
import { ADD_TOKEN } from '../types'
import { IActionToken } from '../interfaces'

export const tokenReducer: Reducer<string | null, IActionToken> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case ADD_TOKEN:
      return action.payload

    default:
      return state
  }
}
