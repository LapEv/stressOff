import { Shadow, TextTitle, Touchable, View } from 'components'
import { RootState } from 'store'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { ILocalizationOptions } from 'localization/interfaces'
import { ISoundState } from '@/store/interfaces'
import { useDispatch } from 'react-redux'
import { modalShow } from '@/store/actions/modal'

export const ListFooter = () => {
  const width = useWindowDimensions().width
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const StateSound = useSelector<RootState>(state => state.sound) as ISoundState
  const dispatch = useDispatch()

  const ClearSoundList = () => {
    dispatch(modalShow(language.modalMessages.clearSoundList))
  }

  return (
    <View style={styles.container}>
      {StateSound.mixedSound.length > 0 && (
        <Shadow style={{ width: width * 0.4, radius: 10, ...styles.shadowOpt }}>
          <Touchable style={styles.touchableSound} onPress={ClearSoundList}>
            <TextTitle type="title_20b">{language.buttons.clear}</TextTitle>
          </Touchable>
        </Shadow>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shadowOpt: {
    height: 52,
    opacity: 0.7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
  },
  shadowStyle: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
    opacity: 1,
  },
  touchableSound: {
    width: '99.5%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
