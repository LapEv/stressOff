import { RootStackParamList } from '@/navigations/interfaces'
import { RouteProp } from '@react-navigation/native'
import { ImageSourcePropType } from 'react-native'

export interface IMuscisScreenData {
  id: number
  title: string
}

export interface IMuscisTiles {
  id: string
  _id: string
  findUseMusic: boolean
  item: string
  img: ImageSourcePropType
  title: string
  description: string
  location: string
  storage: string
  name: string
  booked: string
  globalCategory: string
  newSound: string
}

export interface IMusicScreenProps {
  route?: RouteProp<RootStackParamList, 'MusicsScreen'>
}
