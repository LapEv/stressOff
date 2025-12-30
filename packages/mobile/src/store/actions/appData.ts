import { IAppData_ } from './../interfaces'
import { ADD_APP_DATA, UPDATE_APP_DATA } from '../types'

export const addAppData = (data: IAppData_) => {
  return {
    type: ADD_APP_DATA,
    payload: data,
  }
}

export const updateAppData = (data: IAppData_) => {
  return {
    type: UPDATE_APP_DATA,
    payload: data,
  }
}
