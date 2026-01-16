import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import {
  NavigationHelpers,
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native'
import { FlatList } from 'react-native'

export interface ICustomBottomItem {
  state: TabNavigationState<ParamListBase>
  // descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
  // insets: EdgeInsets;
  id: number
  value: NavigationRoute<ParamListBase, string>
  options: BottomTabNavigationOptions
  myList: React.RefObject<FlatList | null>
  keys?: string
}

export interface ICustomBottomTabData {
  id: number
  title?: string
  keys?: string
}

export interface ICustomBottomProps extends BottomTabBarProps {
  label: string
}

export interface IOptionsBottomStyle {
  buttonMain: Record<string, unknown>
  button: Record<string, unknown>
  touch: Record<string, unknown>
  container: Record<string, unknown>
}
