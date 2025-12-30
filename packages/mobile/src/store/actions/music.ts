import { IMusicState } from '../interfaces'
import { CHANGE_STATE_MUSIC } from '../types'

export const ChangeStateMusic = (music: IMusicState) => {
  return {
    type: CHANGE_STATE_MUSIC,
    payload: music,
  }
}
