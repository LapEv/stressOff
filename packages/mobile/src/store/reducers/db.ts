import { Reducer } from 'react'
import {
  IActionDB,
  IDBState,
  IMUSICCategories,
  IMUSICS,
  INOTIFICATIONS,
  ISOUNDCategories,
  ISOUNDS,
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
        sounds: [...state.sounds, { ...(action.payload as ISOUNDS) }],
      }
    case ADD_MUSIC_DB:
      return {
        ...state,
        musics: [...state.musics, { ...(action.payload as IMUSICS) }],
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
        sounds: action.payload as ISOUNDS[],
      }
    case LOAD_MUSIC_FB:
      return {
        ...state,
        musics: action.payload as IMUSICS[],
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
      state.sounds.map(_sound => {
        const updateSound = (action.payload as ISOUNDS[]).find(
          value => value.name === _sound.name,
        )
        if (updateSound) {
          _sound.img = updateSound.img
          _sound.sound = updateSound.sound
          _sound.location = updateSound.location
          _sound.booked = updateSound.booked
          _sound.new = updateSound.new
        }
      })
      return {
        ...state,
        sounds: state.sounds,
      }
    case LOAD_MUSIC_DB:
      state.musics.map(_music => {
        const updateMusic = (action.payload as IMUSICS[]).find(
          value => value.name === _music.name,
        )
        if (updateMusic) {
          _music.img = updateMusic.img
          _music.sound = updateMusic.sound
          _music.location = updateMusic.location
          _music.booked = updateMusic.booked
          _music.new = updateMusic.new
        }
      })
      return {
        ...state,
        musics: state.musics,
      }
    case LOAD_SOUND_CATEGORIES_DB:
      state.soundCategories.map(_soundCategories => {
        const updateSoundCategories = (
          action.payload as ISOUNDCategories[]
        ).find(value => value.name === _soundCategories.category)
        if (updateSoundCategories) {
          _soundCategories.img = updateSoundCategories.img
          _soundCategories.img_lt = updateSoundCategories.img_lt
        }
      })
      return {
        ...state,
        soundCategories: state.soundCategories,
      }
    case LOAD_MUSIC_CATEGORIES_DB:
      state.musicCategories.map(_musicCategories => {
        const updateMusicCategories = (
          action.payload as IMUSICCategories[]
        ).find(value => value.name === _musicCategories.category)
        if (updateMusicCategories) {
          _musicCategories.img = updateMusicCategories.img
          _musicCategories.img_lt = updateMusicCategories.img_lt
        }
      })
      return {
        ...state,
        musicCategories: state.musicCategories,
      }
    case LOAD_NOTIFICATIONS_DB:
      return {
        ...state,
        notifications: action.payload as INOTIFICATIONS[],
      }
    case UPDATE_SOUND_DB: {
      const dbSound = state.sounds.map(value => {
        const newValue = action.payload as ISOUNDS
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
        const newValue = action.payload as IMUSICS
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
      const dbStatusNewSounds = state.sounds.map(value => {
        const newValue = action.payload as ISOUNDS
        if (value.name === newValue.name) {
          value.new = newValue.new
        }
        return value
      })
      return {
        ...state,
        sounds: dbStatusNewSounds,
      }
    }
    case UPDATE_MUSIC_STATUS_NEW: {
      const dbStatusNewMusics = state.musics.map(value => {
        const newValue = action.payload as IMUSICS
        if (value.name === newValue.name) {
          value.new = newValue.new
        }
        return value
      })
      return {
        ...state,
        musics: dbStatusNewMusics,
      }
    }
    case UPDATE_SOUND_BOOKED: {
      const dbStatusSoundsBooked = state.sounds.map(value => {
        const newValue = action.payload as ISOUNDS
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
        const newValue = action.payload as IMUSICS
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
