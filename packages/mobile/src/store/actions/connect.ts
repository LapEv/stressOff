import { CHANGE_CONNECT } from '../types'

export const changeConnect = (data: boolean) => {
  return {
    type: CHANGE_CONNECT,
    payload: data,
  }
}
