import { TimerSVG } from '@/assets/icons/SVG'
import { Shadow, Touchable, View } from '@/components'
import { TimeView } from '@/screens/Timer/TimeView'
import { StyleSheet } from 'react-native'
import { IPlayerTimer } from '../interfaces'
import { RootState } from '@/store'
import { IMusicState, ISoundState } from '@/store/interfaces'
import { useSelector } from 'react-redux'
import { useTheme } from '@/hooks'

export const PlayerTimer = ({ navigation, disabledControl }: IPlayerTimer) => {
  const [{ ITEM_COLOR }] = useTheme()
  const StateMusic = useSelector<RootState>(state => state.music) as IMusicState
  const StateSound = useSelector<RootState>(state => state.music) as ISoundState

  console.log('StateSound.mixedSound = ', StateSound.mixedSound)

  return (
    <Shadow style={styles.shadowTimer}>
      <Touchable
        style={{ ...styles.touchTimer, opacity: disabledControl ? 0.5 : 1 }}
        disabled={disabledControl}
        onPress={() =>
          navigation.navigate('TimerScreen', { screen: 'TimerScreen' })
        }>
        <View style={styles.viewTimer}>
          <TimerSVG width="100%" height="100%" fill={ITEM_COLOR} />
          <TimeView
            screen={'Player'}
            on={
              (StateSound.mixedSound && StateSound.mixedSound.length) ||
              StateMusic.id > 0
                ? true
                : false
            }
          />
        </View>
      </Touchable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  shadowTimer: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  touchTimer: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTimer: {
    width: 45,
    height: 45,
  },
})
