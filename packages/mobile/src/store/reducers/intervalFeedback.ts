import { Reducer } from 'react'
import { INTERVAL_FEEDBACK } from '../types'
import { IActionIntervalFeedback, IIntervalFeedback } from '../interfaces'

const initialState = {
  date: new Date(),
}

export const IntervalFeedbackReducer: Reducer<
  IIntervalFeedback,
  IActionIntervalFeedback
> = (state = initialState, action) => {
  switch (action.type) {
    case INTERVAL_FEEDBACK:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
