import { THEME_CURRENT } from '../types'
import Colors from '@/theme/Theme'
import { IActionTheme } from '../interfaces'
import { Reducer } from 'react'
import { ITheme } from '@/theme/interfaces'

const initialState = Colors.dark

export const themeReducer: Reducer<ITheme, IActionTheme> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case THEME_CURRENT:
      return {
        ...state,
        ...Colors['dark'],
      }
    default:
      return state
  }
}
