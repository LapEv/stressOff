import { RootStackParamList } from '@/navigations'
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export interface IFeedBack {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export type NavigationPropFeedBack = StackNavigationProp<
  RootStackParamList,
  'FeedBackScreen'
>
