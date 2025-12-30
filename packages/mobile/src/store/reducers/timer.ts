import { Reducer } from 'react'
import { TIMER_START, TIMER_STOP, TICK, TIMER_CLOSE_APP } from '../types'
import { IActionTimer, ITimerState } from '../interfaces'

const initialState = {
  isOn: false,
  time: 0,
  selectedTime: 0,
  closeApp: false,
  needStopPlay: false,
  offset: 0,
  interval: 0,
}

export const timerReducer: Reducer<ITimerState, IActionTimer> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case TIMER_START:
      // console.log('TIMER_START reducer = ', action);
      return {
        ...state,
        isOn: true,
        offset: action.payload.offset,
        time: action.payload.offset - action.payload.time,
        interval: action.payload.interval,
        needStopPlay: false,
      }

    case TIMER_STOP:
      // console.log('TIMER_STOP reducer = ', action);
      // console.log('====================');
      clearInterval(state.interval)
      return {
        ...initialState,
        needStopPlay: true,
      }

    case TICK:
      // console.log('TICK reducer = ', action);
      return {
        ...state,
        time: state.offset - action.payload.time,
        // offset: action.time,
      }
    case TIMER_CLOSE_APP:
      return {
        ...state,
        closeApp: action.payload.closeApp,
        // offset: action.time,
      }
    default:
      return state
  }
}
