import { LANGUAGE } from 'localization/language'
import { LANGUAGE_CURRENT, CREATE_LANGUAGE_CATEGORY } from '../types'
import { ILocalizationOptions } from 'localization/interfaces'
import { IActionLanguage } from '../interfaces'
import { Reducer } from 'react'

const initialState = LANGUAGE.RUS

export const languageReducer: Reducer<ILocalizationOptions, IActionLanguage> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LANGUAGE_CURRENT: {
      let currentAllLanguage
      Object.keys(LANGUAGE).find(key => {
        if (key === action.payload._name) {
          currentAllLanguage = LANGUAGE[
            key as keyof typeof LANGUAGE
          ] as ILocalizationOptions
        }
      })
      currentAllLanguage = action.payload._categorySounds
        ? action.payload._categorySounds
        : action.payload._categoriesMusic
          ? action.payload._categoriesMusic
          : action.payload._categoryFavorites
            ? action.payload._categoryFavorites
            : null
      return {
        ...state,
        ...currentAllLanguage,
      }
    }
    case CREATE_LANGUAGE_CATEGORY:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
