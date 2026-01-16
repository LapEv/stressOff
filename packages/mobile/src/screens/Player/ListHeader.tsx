import { Shadow, TextTitle, Touchable, View, ViewStyle } from 'components'
import { RootState } from 'store'
import { ITheme } from 'theme/interfaces'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { IListHeader } from './interfaces'
import { MusicSVG, SoundSVG } from '@/assets/icons/SVG'
import { MusicItems } from './MusicItems'
import { typeElevation } from '@/components/Shadow/typeElevaion'
import { useLanguage } from '@/hooks'

export const ListHeader = ({ navigation, playingDataSound }: IListHeader) => {
  const width = useWindowDimensions().width
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const [{ headerTitle, Messages }] = useLanguage()
  const stateMusicID = useSelector<RootState>(state => state.music.id) as number

  return (
    <View style={styles.container}>
      <Shadow
        containerStyle={styles.shadowContainer}
        style={{ width: width * 0.95, radius: 10, ...styles.shadowStyleMusic }}>
        <Touchable
          style={{
            borderColor: theme.borderColor2,
            ...styles.touchableMusic,
          }}
          onPress={() =>
            navigation.navigate('SectionsTabNavigation', {
              screen: 'MusicsTabNavigation',
            })
          }>
          <TextTitle type="title_20b" style={styles.textMusic}>
            {headerTitle.music}
          </TextTitle>
          <View style={styles.viewSVG}>
            <MusicSVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </View>
        </Touchable>
      </Shadow>
      {stateMusicID === 0 ? (
        <TextTitle type="title_14" style={styles.textMessages}>
          {Messages.emptyList}
        </TextTitle>
      ) : (
        <MusicItems id={stateMusicID} />
      )}
      <View style={styles.container}>
        <ViewStyle
          style={{ width: width * 0.95, ...styles.containerViewStyle }}
        />
      </View>
      <Shadow
        style={{ width: width * 0.95, radius: 10, ...styles.shadowStyle }}>
        <Touchable
          style={{
            borderColor: theme.borderColor2,
            ...styles.touchHeaderSound,
          }}
          onPress={() =>
            navigation.navigate('SectionsTabNavigation', {
              screen: 'SoundsTabNavigation',
            })
          }>
          <TextTitle type="title_20b">{headerTitle.sound}</TextTitle>
          <View style={styles.viewSVG}>
            <SoundSVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </View>
        </Touchable>
      </Shadow>
      {!playingDataSound.length && (
        <View>
          <TextTitle type="title_14" style={styles.textMessages}>
            {Messages.emptyList}
          </TextTitle>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerViewStyle: {
    marginTop: 10,
    height: 0.5,
    ...typeElevation,
  },
  pleerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textMessages: {
    opacity: 0.8,
    paddingLeft: 30,
    paddingTop: 10,
  },
  touchableMusic: {
    width: '99.5%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
  },
  textMusic: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: '#FFFFFF',
  },
  viewSVG: {
    width: 25,
    height: 25,
  },
  shadowStyleMusic: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  shadowStyle: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 15,
  },
  shadowContainer: {
    marginTop: 15,
  },

  touchHeaderSound: {
    width: '99.5%',
    height: '100%',

    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
  },
})
