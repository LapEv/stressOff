import { RootStackParamList } from '@/navigations'
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ITimer {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export type NavigationPropTimer = StackNavigationProp<
  RootStackParamList,
  'TimerScreen'
>

export interface ITimeData {
  id: string
  title: string
  duration: number
}

export interface ITimeView {
  screen?: string
  on: boolean
}

export interface ITimeTiles {
  id?: string
  title: string
  duration: number
}
