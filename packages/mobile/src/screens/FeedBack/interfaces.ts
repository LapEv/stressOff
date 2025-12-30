import { RootStackParamList } from '@/navigations'
import { StackNavigationProp } from '@react-navigation/stack'

export interface IFeedBack {
  navigation: NavigationPropFeedBack
}

export type NavigationPropFeedBack = StackNavigationProp<
  RootStackParamList,
  'FeedBack'
>
