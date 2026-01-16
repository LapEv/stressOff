import { IMUSICCategories, ISOUNDCategories } from '@/store/interfaces'
import { MaterialTopTabDescriptor } from './../../../../../../node_modules/@react-navigation/material-top-tabs/src/types'
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs'
import {
  NavigationHelpers,
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native'
import { FlatList } from 'react-native'

type MaterialTopTabDescriptorMap = Record<string, MaterialTopTabDescriptor>
export interface ITab {
  state: TabNavigationState<ParamListBase>
  descriptors: MaterialTopTabDescriptorMap
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
  value: NavigationRoute<ParamListBase, string> | undefined
  options: MaterialTopTabNavigationOptions
}

export interface ICustomTab {
  id?: number
  myList?: React.RefObject<FlatList<Record<string, unknown>> | null>
  label: string
  categories: IMUSICCategories[] & ISOUNDCategories[]
  state: TabNavigationState<ParamListBase>
  descriptors: MaterialTopTabDescriptorMap
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export interface ICustomTabItem extends ITab {
  id: number
  myList: React.RefObject<FlatList<Record<string, unknown>> | null>
}

export interface IOptionsTabStyle {
  button: Record<string, unknown>
  touch: Record<string, unknown>
  container: Record<string, unknown>
}
