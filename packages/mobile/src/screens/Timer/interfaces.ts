import { RootStackParamList } from '@/navigations'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ITimer {
  navigation: NavigationPropTimer
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
