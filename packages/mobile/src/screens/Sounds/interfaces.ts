import { RootStackParamList } from '@/navigations/interfaces'
import { ILanguageObject } from '@/store/interfaces'
import { RouteProp } from '@react-navigation/native'

export interface ISoundsScreenData {
  id: number
  title: string
}

export interface ISoundsTiles {
  id: string
  _id: string
  findUseSound: boolean
  item: string
  img: string
  title: ILanguageObject
  description: string
  location: string
  storage: string
  name: string
  booked: boolean
  globalCategory: string
  newSound: boolean
}

export interface ISoundsScreenProps {
  route?: RouteProp<RootStackParamList, 'SoundsScreen'>
}
