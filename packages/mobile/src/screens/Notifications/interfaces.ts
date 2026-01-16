import { RootStackParamList } from '@/navigations'
import { StackNavigationProp } from '@react-navigation/stack'

export interface INotifications {
  navigation: NavigationPropNotifications
}

export type NavigationPropNotifications = StackNavigationProp<
  RootStackParamList,
  'NotificationsScreen'
>
