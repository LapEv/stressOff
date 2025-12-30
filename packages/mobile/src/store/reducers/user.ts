import { Reducer } from 'react'
import { ADD_USER_DATA, UPDATE_USER_DATA } from '../types'
import { IActionUser, IUser } from '../interfaces'

const initialState = {
  createdAt: '',
  username: '',
  email: '',
  name: '',
  type: '',
  token: '',
  roles: [],
}

export const userReducer: Reducer<IUser, IActionUser> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }

    case UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
