import { IProgressBar } from '../interfaces'
import { PROGRESS_BAR_SHOW } from '../types'

export const progressBarShow = (progressBarInfo: IProgressBar) => {
  return {
    type: PROGRESS_BAR_SHOW,
    payload: progressBarInfo,
  }
}
