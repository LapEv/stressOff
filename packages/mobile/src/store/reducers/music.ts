import { Reducer } from 'react'
import { IActionMusicState, IMusicState } from '../interfaces'
import { CHANGE_STATE_MUSIC } from '../types'

const initialState = {
  _id: '',
  id: 0,
  playing: false,
  volume: 1.0,
  musicStart: false,
  startApp: true,
}

export const musicReducer: Reducer<IMusicState, IActionMusicState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHANGE_STATE_MUSIC:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
