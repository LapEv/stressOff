import { LinearGradient, TextConst, View } from 'components'
import { StyleSheet } from 'react-native'
import { Mountaint } from './Mountain'
import { LANGUAGE } from '@/localization/language'

export const NoInternet = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient>
        <Mountaint />
        <View style={styles.containerImage}>
          <TextConst>{LANGUAGE.RUS.Messages.noInternet}</TextConst>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  containerImage: {
    width: '90%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
