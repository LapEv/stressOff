import { ISOUNDCategories } from '@/store/interfaces'
import { MaterialTopTabDescriptor } from './../../../../../../node_modules/@react-navigation/material-top-tabs/src/types'
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs'
import {
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native'
import { FlatList } from 'react-native'

type MaterialTopTabDescriptorMap = Record<string, MaterialTopTabDescriptor>
export interface ITab {
  state: TabNavigationState<ParamListBase>
  descriptors: MaterialTopTabDescriptorMap
  navigation: Record<string, unknown>
  value: NavigationRoute<ParamListBase, string> | undefined
  options: MaterialTopTabNavigationOptions
}

export interface ICustomTab {
  id?: number
  myList?: React.RefObject<FlatList<Record<string, unknown>> | null>
  label: string
  categories: ISOUNDCategories[]
  state: TabNavigationState<ParamListBase>
  descriptors: MaterialTopTabDescriptorMap
  navigation: Record<string, unknown>
}

export interface ICustomTabItem extends ITab {
  id: number
  myList: React.RefObject<FlatList<Record<string, unknown>> | null>
}
