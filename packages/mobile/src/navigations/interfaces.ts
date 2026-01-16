import { StackNavigationProp } from '@react-navigation/stack'
import { JSX } from 'react'

export type IAppNavigation = {
  login: boolean
  setToken: (data: string | null) => void
}

export type RootStackParamList = {
  Home: undefined
  SectionsTabNavigation: {
    name?: string
    component?: JSX.Element
    screen?: string
  }
  SoundsTabNavigation: {
    name?: string
    component?: JSX.Element
    screen?: string
    initialRouteName?: string
  }

  LoginNavigation: {
    screen: string
    component?: JSX.Element
  }
  PlayerScreen: {
    screen: string
    component?: JSX.Element
  }
  SettingsScreen: {
    screen: string
    component?: JSX.Element
  }
  FeedBackScreen: {
    screen: string
    component?: JSX.Element
  }
  LanguageScreen: {
    screen: string
    component?: JSX.Element
  }
  NotificationsScreen: {
    screen: string
    component?: JSX.Element
  }
  TimerScreen: {
    screen: string
    component?: JSX.Element
  }
  SoundsScreen: {
    initialRouteName: string
    screen: string
    component?: JSX.Element
    category?: string
    scrollToEnd: boolean
  }
  MusicsScreen: {
    initialRouteName: string
    screen: string
    component?: JSX.Element
    category?: string
    scrollToEnd: boolean
  }
  LoginScreen: {
    screen: string
    component?: JSX.Element
  }
  SignUpScreen: {
    screen: string
    component?: JSX.Element
  }
  ResetPasswordScreen: {
    screen: string
    component?: JSX.Element
  }
  MixesScreen: {
    screen: string
    component?: JSX.Element
  }
  BookedScreenSounds: {
    screen: string
    component?: JSX.Element
  }
  BookedScreenMusics: {
    screen: string
    component?: JSX.Element
  }
}

export type NavigationPropPlayer = StackNavigationProp<
  RootStackParamList,
  'PlayerScreen'
>

export type NavigationPropNotifications = StackNavigationProp<
  RootStackParamList,
  'NotificationsScreen'
>

export interface ITabBarIconProps {
  focused: boolean
  color: string
  size: number
}

export type NavigationPropSound = StackNavigationProp<
  RootStackParamList,
  'SoundsScreen'
>
