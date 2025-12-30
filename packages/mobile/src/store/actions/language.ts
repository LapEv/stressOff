import { Dispatch } from 'react'
import { LANGUAGE_CURRENT, CREATE_LANGUAGE_CATEGORY } from '../types'

export const ChangeLanguage = (language: string) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: LANGUAGE_CURRENT,
      payload: language,
    })
  }
}

export const CreateLanguageCategory = (data: string) => {
  return async (dispatch: Dispatch<Record<string, unknown>>) => {
    dispatch({
      type: CREATE_LANGUAGE_CATEGORY,
      payload: data,
    })
  }
}
