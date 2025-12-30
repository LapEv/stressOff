import { IToken } from '../interfaces'
import { ADD_TOKEN } from '../types'

export const addToken = (data: IToken) => {
  return {
    type: ADD_TOKEN,
    payload: data,
  }
}
