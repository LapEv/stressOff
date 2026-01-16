import { Reducer } from 'react'
import {
  IActionDB,
  IDBState,
  IMUSICCategories,
  IMUSICSDB,
  INOTIFICATIONS,
  ISOUNDCategories,
  ISOUNDSDB,
} from '../interfaces'
import {
  ADD_SOUND_DB,
  ADD_MUSIC_DB,
  ADD_NOTIFICATIONS_DB,
  LOAD_SOUND_FB,
  LOAD_MUSIC_FB,
  LOAD_SOUND_CATEGORIES_FB,
  LOAD_MUSIC_CATEGORIES_FB,
  LOAD_SOUND_DB,
  LOAD_MUSIC_DB,
  LOAD_SOUND_CATEGORIES_DB,
  LOAD_MUSIC_CATEGORIES_DB,
  LOAD_NOTIFICATIONS_DB,
  UPDATE_SOUND_DB,
  UPDATE_MUSIC_DB,
  UPDATE_SOUND_STATUS_NEW,
  UPDATE_MUSIC_STATUS_NEW,
  UPDATE_SOUND_BOOKED,
  UPDATE_MUSIC_BOOKED,
  UPDATE_NOTIFICATIONS_DB,
  LOAD_NOTIFICATIONS_FB,
} from '../types'

const initialState = {
  sounds: [],
  musics: [],
  soundCategories: [],
  musicCategories: [],
  notifications: [],
}

export const DBReducer: Reducer<IDBState, IActionDB> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_SOUND_DB:
      return {
        ...state,
        sounds: [...state.sounds, { ...(action.payload as ISOUNDSDB) }],
      }
    case ADD_MUSIC_DB:
      return {
        ...state,
        musics: [...state.musics, { ...(action.payload as IMUSICSDB) }],
      }
    case ADD_NOTIFICATIONS_DB:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...(action.payload as INOTIFICATIONS) },
        ],
      }
    case LOAD_SOUND_FB:
      return {
        ...state,
        sounds: action.payload as ISOUNDSDB[],
      }
    case LOAD_MUSIC_FB:
      return {
        ...state,
        musics: action.payload as IMUSICSDB[],
      }
    case LOAD_SOUND_CATEGORIES_FB:
      return {
        ...state,
        soundCategories: action.payload as ISOUNDCategories[],
      }
    case LOAD_MUSIC_CATEGORIES_FB:
      return {
        ...state,
        musicCategories: action.payload as IMUSICCategories[],
      }
    case LOAD_NOTIFICATIONS_FB:
      return {
        ...state,
        notifications: action.payload as INOTIFICATIONS[],
      }
    case LOAD_SOUND_DB:
      return {
        ...state,
        sounds: action.payload as ISOUNDSDB[],
      }
    case LOAD_MUSIC_DB:
      return {
        ...state,
        musics: action.payload as IMUSICSDB[],
      }
    case LOAD_SOUND_CATEGORIES_DB:
      return {
        ...state,
        soundCategories: action.payload as ISOUNDCategories[],
      }
    case LOAD_MUSIC_CATEGORIES_DB:
      return {
        ...state,
        musicCategories: action.payload as IMUSICCategories[],
      }
    case LOAD_NOTIFICATIONS_DB:
      return {
        ...state,
        notifications: action.payload as INOTIFICATIONS[],
      }
    case UPDATE_SOUND_DB: {
      const dbSound = state.sounds.map(value => {
        const newValue = action.payload as ISOUNDSDB
        if (value.name === newValue.name) {
          value.sound = newValue.sound
          value.location = newValue.location
        }
        return value
      })
      return {
        ...state,
        sounds: dbSound,
      }
    }
    case UPDATE_MUSIC_DB: {
      const dbMusic = state.musics.map(value => {
        const newValue = action.payload as IMUSICSDB
        if (value.name === newValue.name) {
          value.sound = newValue.sound
          value.location = newValue.location
        }
        return value
      })
      return {
        ...state,
        musics: dbMusic,
      }
    }
    case UPDATE_NOTIFICATIONS_DB: {
      const dbNotifications = state.notifications.map(value => {
        const newValue = action.payload as INOTIFICATIONS
        if (value.id === newValue.id) {
          value.unread = false
        }
        return value
      })
      return {
        ...state,
        notifications: dbNotifications,
      }
    }
    case UPDATE_SOUND_STATUS_NEW: {
      const { _id, newSound } = action.payload as ISOUNDSDB
      return {
        ...state,
        sounds: state.sounds.map(item =>
          item._id === _id ? { ...item, newSound: newSound } : item,
        ),
      }
    }
    case UPDATE_MUSIC_STATUS_NEW: {
      const { _id, newSound } = action.payload as IMUSICSDB
      return {
        ...state,
        sounds: state.musics.map(item =>
          item._id === _id ? { ...item, newSound: newSound } : item,
        ),
      }
    }
    case UPDATE_SOUND_BOOKED: {
      const dbStatusSoundsBooked = state.sounds.map(value => {
        const newValue = action.payload as ISOUNDSDB
        if (value.id === newValue.id) {
          value.booked = newValue.booked
        }
        return value
      })
      return {
        ...state,
        sounds: dbStatusSoundsBooked,
      }
    }
    case UPDATE_MUSIC_BOOKED: {
      const dbStatusMusicsBooked = state.musics.map(value => {
        const newValue = action.payload as IMUSICSDB
        if (value.id === newValue.id) {
          value.booked = newValue.booked
        }
        return value
      })
      return {
        ...state,
        musics: dbStatusMusicsBooked,
      }
    }
    default:
      return state
  }
}
