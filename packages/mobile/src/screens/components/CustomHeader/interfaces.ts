import {
  NavigationPropNotifications,
  NavigationPropPlayer,
} from '@/navigations'
import { NavigationPropSound } from '@/navigations/interfaces'
import { NavigationPropAuth } from '@/screens/Auth/interfaces'
import { NavigationPropFeedBack } from '@/screens/FeedBack/interfaces'
import { NavigationPropLanguage } from '@/screens/Language/interfaces'
import { NavigationPropSettings } from '@/screens/Settings/interfaces'
import { NavigationPropTimer } from '@/screens/Timer/interfaces'

export interface ICustomHeader {
  navigation:
    | NavigationPropPlayer
    | NavigationPropNotifications
    | NavigationPropSound
    | NavigationPropAuth
    | NavigationPropSettings
    | NavigationPropFeedBack
    | NavigationPropLanguage
    | NavigationPropTimer
  label: string
  type?: string
}
