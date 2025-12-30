import { NavigationPropSound } from '@/navigations/interfaces'
import { ParamListBase, RouteProp } from '@react-navigation/native'

export interface IMuscisScreenData {
  id: number
  title: string
}

export interface IMuscisTiles {
  id: string
  findUseMusic: boolean
  item: string
  img: string
  title: string
  description: string
  location: string
  storage: string
  name: string
  booked: boolean
  globalCategory: string
  newSnd: boolean
}

export type Props = {
  navigation: NavigationPropSound
  route: RouteProp<ParamListBase, string>
}
