import { THEME_CURRENT } from '../types'
import { Dispatch } from 'redux'

export const ChangeTheme = (theme: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: THEME_CURRENT,
      payload: theme,
    })
  }
}
