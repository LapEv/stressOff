import { jwtDecode } from 'jwt-decode'
import { api } from './api'
import { authhost, host } from '.'
import * as SecureStore from 'expo-secure-store'
import store from '@/store'
import { addToken } from '@/store/actions/token'
import { IUser, IUserDataFB } from '@/store/interfaces'
import { IRegistration } from './interfaces'

export const registration = async (userData: IRegistration) => {
  const { data } = await host.post(api.Registration, userData)
  SecureStore.setItemAsync('token', data.token)
  return { user: jwtDecode(data.token) as IUser, token: data.token }
}

export const setAnonymousUser = async () => {
  const { data } = await host.post(api.SetAnonymousUser)
  await SecureStore.setItemAsync('token', data.token)
  store.dispatch(addToken(data.token))
  return { user: data.user as IUserDataFB, token: data.token }
}

export const resetPassword = async (email: string) => {
  const { data } = await host.post(api.ResetPassword, { email })
  return data
}

export const changePassword = async (_id: string, password: string) => {
  const { data } = await host.post(api.ChangePassword, { _id, password })
  await SecureStore.setItemAsync('token', data.token)
  store.dispatch(addToken(data.token))
  return jwtDecode(data.token)
}

export const login = async (username: string, password: string) => {
  const { data } = await host.post(api.Login, {
    username,
    password,
  })
  await SecureStore.setItemAsync('token', data.token)
  store.dispatch(addToken(data.token))
  return { user: jwtDecode(data.token) as IUser, token: data.token }
}

export const check = async () => {
  const { data } = await authhost.get(api.Check)
  await SecureStore.setItemAsync('token', data.token)
  store.dispatch(addToken(data.token))
  return { user: jwtDecode(data.token) as IUser, token: data.token }
}

export const findUserData = async (id: string) => {
  const { data } = await authhost.post(api.FIND_USER_DATA, { id })
  return data
}
