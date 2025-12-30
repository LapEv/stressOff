import { Dispatch } from 'react'
import {
  IMUSICCategories,
  IMUSICS,
  INOTIFICATIONS,
  ISOUNDCategories,
  ISOUNDS,
  IUpdateMUSICS,
  IUpdateSOUNDS,
} from '../interfaces'
import {
  ADD_SOUND_DB,
  ADD_MUSIC_DB,
  ADD_NOTIFICATIONS_DB,
  LOAD_SOUND_FB,
  LOAD_MUSIC_FB,
  LOAD_SOUND_DB,
  LOAD_MUSIC_DB,
  LOAD_SOUND_CATEGORIES_FB,
  LOAD_MUSIC_CATEGORIES_FB,
  LOAD_SOUND_CATEGORIES_DB,
  LOAD_MUSIC_CATEGORIES_DB,
  LOAD_NOTIFICATIONS_DB,
  UPDATE_SOUND_DB,
  UPDATE_MUSIC_DB,
  UPDATE_NOTIFICATIONS_DB,
  UPDATE_SOUND_STATUS_NEW,
  UPDATE_MUSIC_STATUS_NEW,
  UPDATE_SOUND_BOOKED,
  UPDATE_MUSIC_BOOKED,
  LOAD_NOTIFICATIONS_FB,
} from '../types'

export const AddSoundsDB = (data: ISOUNDS) => {
  return {
    type: ADD_SOUND_DB,
    payload: data,
  }
}

export const AddMusicsDB = (data: IMUSICS) => {
  return {
    type: ADD_MUSIC_DB,
    payload: data,
  }
}

export const AddNotificationsDB = (data: INOTIFICATIONS) => {
  return {
    type: ADD_NOTIFICATIONS_DB,
    payload: data,
  }
}

export const LoadSoundFromFB = (soundDB: ISOUNDS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_SOUND_FB,
      payload: soundDB,
    })
  }
}

export const LoadMusicFromFB = (musicDB: IMUSICS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_MUSIC_FB,
      payload: musicDB,
    })
  }
}

export const LoadSoundCategoriesFromFB = (
  soundCategoriesDB: ISOUNDCategories[],
) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_SOUND_CATEGORIES_FB,
      payload: soundCategoriesDB,
    })
  }
}

export const LoadMusicCategoriesFromFB = (
  musicCategoriesDB: IMUSICCategories[],
) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_MUSIC_CATEGORIES_FB,
      payload: musicCategoriesDB,
    })
  }
}

export const LoadNotificationsFromFB = (notificationsDB: INOTIFICATIONS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_NOTIFICATIONS_FB,
      payload: notificationsDB,
    })
  }
}

export const LoadSoundFromDB = (soundDB: ISOUNDS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_SOUND_DB,
      payload: soundDB,
    })
  }
}

export const LoadMusicFromDB = (musicDB: IMUSICS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_MUSIC_DB,
      payload: musicDB,
    })
  }
}

export const LoadSoundCategoriesFromDB = (
  soundCategoriesDB: ISOUNDCategories[],
) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_SOUND_CATEGORIES_DB,
      payload: soundCategoriesDB,
    })
  }
}

export const LoadMusicCategoriesFromDB = (
  musicCategoriesDB: IMUSICCategories[],
) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_MUSIC_CATEGORIES_DB,
      payload: musicCategoriesDB,
    })
  }
}

export const LoadNotificationsFromDB = (notificationsDB: INOTIFICATIONS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_NOTIFICATIONS_DB,
      payload: notificationsDB,
    })
  }
}

export const UpdateSoundsDB = (data: IUpdateSOUNDS) => {
  return {
    type: UPDATE_SOUND_DB,
    payload: data,
  }
}

export const UpdateMusicsDB = (data: IUpdateMUSICS) => {
  return {
    type: UPDATE_MUSIC_DB,
    payload: data,
  }
}

export const UpdateNotificationsDB = (data: INOTIFICATIONS) => {
  return {
    type: UPDATE_NOTIFICATIONS_DB,
    payload: data,
  }
}

export const UpdateSoundsStatusDB = (data: ISOUNDS) => {
  return {
    type: UPDATE_SOUND_STATUS_NEW,
    payload: data,
  }
}

export const UpdateMusicsStatusDB = (data: IMUSICS) => {
  return {
    type: UPDATE_MUSIC_STATUS_NEW,
    payload: data,
  }
}

export const UpdateSoundsBookedDB = (data: IUpdateSOUNDS) => {
  return {
    type: UPDATE_SOUND_BOOKED,
    payload: data,
  }
}

export const UpdateMusicsBookedDB = (data: IUpdateMUSICS) => {
  return {
    type: UPDATE_MUSIC_BOOKED,
    payload: data,
  }
}
