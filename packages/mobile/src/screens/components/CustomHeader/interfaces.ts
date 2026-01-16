import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'

export interface ICustomHeader {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
  label: string
  type?: string
}
