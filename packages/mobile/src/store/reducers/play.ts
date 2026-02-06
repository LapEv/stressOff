import { Reducer } from 'react'
import {
  // IActionSoundState,
  IPlayState,
  IPlayStateAction,
} from '../interfaces'
import {
  ADD_SOUND,
  REMOVE_SOUND,
  TOGGLE_ALL_SOUND,
  // TOGGLE_PLAY_SOUND,
  // CLEAR_SOUND,
  // TOGGLE_START_SOUND,
  // TOGGLE_SOUND_VOLUME,
  // ADD_FAVORITES_SOUND,
  // TOGGLE_MUSIC_CONTROL,
  // TOOGLE_BOOKED_SOUND,
} from '../types'

const initialState = {
  musicPlay: {
    _id: '',
    id: 0,
    playing: false,
    volume: 1.0,
    musicStart: false,
    img: '',
  },
  soundsPlay: {
    mixedSound: [],
    musicControl: false,
    playing: false,
    soundStart: false,
    volume: 0,
    location: '',
    storage: '',
  },
  playAll: true,
  startApp: true,
}

export const playReducer: Reducer<IPlayState, IPlayStateAction> = (
  state = initialState as IPlayState,
  action,
) => {
  switch (action.type) {
    case ADD_SOUND:
      return {
        ...state,
        soundsPlay: {
          ...state.soundsPlay,
          mixedSound: [{ ...action.payload }, ...state.soundsPlay.mixedSound],
        },
      }

    case TOGGLE_ALL_SOUND: {
      return {
        ...state,
        ...action.payload,
        startApp: false,
      }
    }
    case REMOVE_SOUND:
      return {
        ...state,
        ...(state.soundsPlay.mixedSound = state.soundsPlay.mixedSound.filter(
          ({ _id }) => _id !== action.payload._id,
        )),
      }
    default:
      return state
  }
}
