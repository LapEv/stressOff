import { dataApp } from '@/data/dataApp'
import { LinearGradient, TextConst, View } from 'components'
import { ImageBackground, StyleSheet } from 'react-native'
import { Mountaint } from './Mountain'

export const Loading = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient>
        <Mountaint />
        <View style={styles.containerImage}>
          <ImageBackground
            source={require('../../assets/icons/lotus.gif')}
            style={styles.image}
            resizeMode="contain"></ImageBackground>
          <TextConst>{dataApp.loading}</TextConst>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  containerImage: {
    width: '50%',
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
