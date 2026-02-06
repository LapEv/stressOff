import { CHANGE_CONNECT, CHANGE_PATH_SERVER } from '../types'

export const changeConnect = (data: boolean) => {
  return {
    type: CHANGE_CONNECT,
    payload: data,
  }
}

export const changePathServer = (data: string) => {
  return {
    type: CHANGE_PATH_SERVER,
    payload: data,
  }
}
