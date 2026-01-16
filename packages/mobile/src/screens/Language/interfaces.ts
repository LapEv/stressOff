import { RootStackParamList } from '@/navigations'
import { StackNavigationProp } from '@react-navigation/stack'

export interface ILanguage {
  navigation: NavigationPropLanguage
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
