import Theme from '@/theme/Theme'
import { Platform } from 'react-native'

export const typeElevation = () => {
  return Platform.select({
    ios: Theme.SHADOW_FOR_IOS,
    android: {
      elevation: 2,
    },
  })
}
