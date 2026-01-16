import { RootStackParamList } from '@/navigations/interfaces'
import { RouteProp } from '@react-navigation/native'
import { ImageSourcePropType } from 'react-native'

export interface ISoundsScreenData {
  id: number
  title: string
}

export interface ISoundsTiles {
  id: string
  _id: string
  findUseSound: boolean
  item: string
  img: ImageSourcePropType
  title: string
  description: string
  location: string
  storage: string
  name: string
  booked: boolean | string
  globalCategory: string
  newSound: string
}

export interface ISoundsScreenProps {
  route?: RouteProp<RootStackParamList, 'SoundsScreen'>
}
