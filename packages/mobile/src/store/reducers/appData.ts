import { Reducer } from 'react'
import { ADD_APP_DATA, UPDATE_APP_DATA } from '../types'
import { IActionAppData, IAppData_ } from '../interfaces'

const initialState = {
  language: '',
  theme: '',
  notificationsByEmail: {
    news: false,
    newSounds: false,
    requestStatuses: false,
  },
}

export const appDataReducer: Reducer<IAppData_, IActionAppData> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_APP_DATA:
      return {
        ...state,
        ...action.payload,
      }

    case UPDATE_APP_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
