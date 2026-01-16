import { Reducer } from 'react'
import { CHANGE_CONNECT } from '../types'
import { IActionConnect } from '../interfaces'

export const connectReducer: Reducer<boolean, IActionConnect> = (
  state = true,
  action,
) => {
  switch (action.type) {
    case CHANGE_CONNECT:
      return action.payload

    default:
      return state
  }
}
