import { Dispatch } from 'react'
import {
  ICategories,
  INOTIFICATIONS,
  ISOUNDS,
  IUpdateSOUNDS,
} from '../interfaces'
import {
  ADD_SOUND_DB,
  ADD_MUSIC_DB,
  ADD_NOTIFICATIONS_DB,
  LOAD_SOUND,
  LOAD_MUSIC,
  LOAD_SOUND_CATEGORIES,
  LOAD_MUSIC_CATEGORIES,
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
import {
  IUpdateMusicsStatusDB,
  IUpdateSoundsStatusDB,
} from '@/hooks/interfaces'

export const AddSoundsDB = (data: ISOUNDS) => {
  return {
    type: ADD_SOUND_DB,
    payload: data,
  }
}

export const AddMusicsDB = (data: ISOUNDS) => {
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

export const LoadSoundCategories = (soundCategoriesDB: ICategories[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_SOUND_CATEGORIES,
      payload: soundCategoriesDB,
    })
  }
}

export const LoadMusicCategories = (musicCategoriesDB: ICategories[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_MUSIC_CATEGORIES,
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

export const LoadSound = (soundDB: ISOUNDS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_SOUND,
      payload: soundDB,
    })
  }
}

export const LoadMusic = (musicDB: ISOUNDS[]) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LOAD_MUSIC,
      payload: musicDB,
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

export const UpdateMusicsDB = (data: IUpdateSOUNDS) => {
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

export const UpdateSoundsStatusDB = (data: IUpdateSoundsStatusDB) => {
  return {
    type: UPDATE_SOUND_STATUS_NEW,
    payload: data,
  }
}

export const UpdateMusicsStatusDB = (data: IUpdateMusicsStatusDB) => {
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

export const UpdateMusicsBookedDB = (data: IUpdateSOUNDS) => {
  return {
    type: UPDATE_MUSIC_BOOKED,
    payload: data,
  }
}
