import { RootStackParamList } from '@/navigations'
import { NavigationContainerRef } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RefObject } from 'react'

export interface IModalMessageProps {
  navigation: RefObject<NavigationContainerRef<RootStackParamList>>
}

export type NavigationPropModalMessage = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>
