import { Reducer } from 'react'
import { CHANGE_CONNECT, CHANGE_PATH_SERVER } from '../types'
import { IActionConnect, IConnect } from '../interfaces'

const initialState = {
  isConnected: false,
  pathServer: '',
}

export const connectReducer: Reducer<IConnect, IActionConnect> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHANGE_CONNECT:
      return {
        ...state,
        isConnected: action.payload,
      }
    case CHANGE_PATH_SERVER:
      return {
        ...state,
        pathServer: action.payload,
      }

    default:
      return state
  }
}
