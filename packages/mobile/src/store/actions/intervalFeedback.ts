import { INTERVAL_FEEDBACK } from '../types'

export const IntervalFeedback = (date: Date | string) => {
  return {
    type: INTERVAL_FEEDBACK,
    payload: date,
  }
}
