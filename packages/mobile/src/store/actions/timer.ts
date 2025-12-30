import { TIMER_START, TIMER_STOP, TICK, TIMER_CLOSE_APP } from '../types'

export const timerStart = timerInfo => {
  return {
    type: TIMER_START,
    payload: timerInfo,
  }
}

export const timerStop = timerInfo => {
  return {
    type: TIMER_STOP,
    payload: timerInfo,
  }
}

export const tick = timerInfo => {
  return {
    type: TICK,
    payload: timerInfo,
  }
}

export const checkCloseApp = timerInfo => {
  // console.log('tick = ', timerInfo);
  return {
    type: TIMER_CLOSE_APP,
    payload: timerInfo,
  }
}
