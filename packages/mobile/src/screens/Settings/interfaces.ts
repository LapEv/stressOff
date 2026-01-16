import { RootStackParamList } from '@/navigations'
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ISettings {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export type NavigationPropSettings = StackNavigationProp<
  RootStackParamList,
  'SettingsScreen'
>

// export interface ISettingsItems {
//   id: number
//   title: string
//   data: {
//     name: string
//     value: string
//     _key: string
//   }[]
// }

export interface ISettingsItemsRender {
  id: number
  title: string
  data: {
    name: string
    value: string
    _key: string
  }[]
}

export interface ISettingsItems {
  name: string
  _key: string
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
  // eslint-disable-next-line
  settingItemsData: any
}
