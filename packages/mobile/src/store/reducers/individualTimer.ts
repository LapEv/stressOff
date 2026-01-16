import { Reducer } from 'react'
import { INDIVIDUAL } from '../types'
import { IActionindividualStart } from '../interfaces'

export const individualTimerReducer: Reducer<
  boolean,
  IActionindividualStart
> = (state = false, action) => {
  switch (action.type) {
    case INDIVIDUAL:
      return action.payload
    default:
      return state
  }
}
