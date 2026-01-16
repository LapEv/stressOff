import { ADD_TOKEN } from '../types'

export const addToken = (data: string | null) => {
  return {
    type: ADD_TOKEN,
    payload: data,
  }
}
