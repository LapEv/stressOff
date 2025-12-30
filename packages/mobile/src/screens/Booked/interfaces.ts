import { NavigationPropSound } from '@/navigations/interfaces'
import { ParamListBase, RouteProp } from '@react-navigation/native'

export type Props = {
  navigation: NavigationPropSound
  route: RouteProp<ParamListBase, string>
}
