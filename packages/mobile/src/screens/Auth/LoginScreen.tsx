import React from 'react'
import { Authorization } from './Authorization'
import { ILogin } from './interfaces'

export const LoginScreen = ({ navigation }: ILogin) => {
  return <Authorization screen="LoginScreen" navigation={navigation} />
}
