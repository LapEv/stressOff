// import { $authHost, $host } from '.';
import jwt_decode from 'jwt-decode'
import { host, authhost } from 'api'
import { api } from './api'
import { IUSERS } from 'store/Data/interfaces'

// export const registration = async (userData) => {
//   const { data } = await host.post(api.Registration, userData);
//   localStorage.setItem('token', data.token);
//   return jwt_decode(data.token);
// };

export const addUser = async (userData: IUSERS) => {
  const { data } = await host.post(api.Registration, userData)
  return data
}

export const login = async (username: string, password: string) => {
  const { data } = await host.post(api.Login, {
    username,
    password,
  })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await authhost.get(api.Check)
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getUsers = async () => {
  const { data } = await authhost.get(api.GetUsers)
  return data
}
