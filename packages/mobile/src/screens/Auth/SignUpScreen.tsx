import React from 'react'
import { Authorization } from './Authorization'
import { ISignUp } from './interfaces'

export const SignUpScreen = ({ navigation }: ISignUp) => {
  return <Authorization screen="SignUpScreen" navigation={navigation} />
}
