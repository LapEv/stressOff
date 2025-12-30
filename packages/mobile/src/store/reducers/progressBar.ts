import { Reducer } from 'react'
import { PROGRESS_BAR_SHOW } from '../types'
import { IProgressBar, IActionProgressBar } from '../interfaces'

const initialState = {
  showDownload: false,
  showDeleteAll: false,
  storage: '',
  name: '',
  category: '',
  id: 0,
  title: '',
}

export const ProgressBarReducer: Reducer<IProgressBar, IActionProgressBar> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case PROGRESS_BAR_SHOW:
      // console.log('ProgressBarReducer = ', action.payload);
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
