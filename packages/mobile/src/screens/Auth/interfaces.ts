import { RootStackParamList } from '@/navigations'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ISignUp {
  navigation: NavigationPropAuth
}

export interface ILogin {
  navigation: NavigationPropAuth
}

export interface IResetPassword {
  navigation: NavigationPropAuth
}

export interface IAuthorization {
  navigation: NavigationPropAuth
  screen: string
}

export type NavigationPropAuth = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>
