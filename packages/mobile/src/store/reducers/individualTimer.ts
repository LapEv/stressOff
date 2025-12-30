import { Reducer } from 'react'
import { INDIVIDUAL } from '../types'
import { IActionindividualStart, IindividualStart } from '../interfaces'

const initialState = {
  individual: false,
}

export const individualTimerReducer: Reducer<
  IindividualStart,
  IActionindividualStart
> = (state = initialState, action) => {
  switch (action.type) {
    case INDIVIDUAL:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
