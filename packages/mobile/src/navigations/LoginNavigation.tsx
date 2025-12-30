import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { verticalAnimationDownUp } from './data'
import { LoginScreen, ResetPasswordScreen, SignUpScreen } from '@/screens'

const LoginNavigator = createNativeStackNavigator()

export const LoginNavigation = () => {
  return (
    <LoginNavigator.Navigator initialRouteName="LoginScreen">
      <LoginNavigator.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={verticalAnimationDownUp}
      />
      <LoginNavigator.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={verticalAnimationDownUp}
      />
      <LoginNavigator.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={verticalAnimationDownUp}
      />
    </LoginNavigator.Navigator>
  )
}
