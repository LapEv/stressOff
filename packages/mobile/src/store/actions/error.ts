import { IError } from '../interfaces'
import { ADD_ERROR } from '../types'

export const addError = (data: IError) => {
  return {
    type: ADD_ERROR,
    payload: data,
  }
}
