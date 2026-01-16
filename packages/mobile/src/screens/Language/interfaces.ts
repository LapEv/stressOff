import { RootStackParamList } from '@/navigations'
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ILanguage {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export type NavigationPropLanguage = StackNavigationProp<
  RootStackParamList,
  'LanguageScreen'
>

export interface ILanguageData {
  id: number
  title: string
  value: string
}

export interface ILanguageTiles {
  title: string
  nameTiles: string
}
