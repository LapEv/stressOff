import { RootStackParamList } from '@/navigations'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ISettings {
  navigation: NavigationPropSettings
}

export type NavigationPropSettings = StackNavigationProp<
  RootStackParamList,
  'Settings'
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
  navigation: NavigationPropSettings
  settingItemsData: any
}
