import { PauseSVG, PlaySVG } from '@/assets/icons/SVG'
import { Shadow, Touchable, ViewStyle } from '@/components'
import { StyleSheet } from 'react-native'
import { IPlayerControl } from '../interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'

export const PlayerControl = ({
  disabledControl,
  play,
  setStatusPlay,
}: IPlayerControl) => {
  const theme = useSelector<RootState>(state => state.theme) as ITheme

  return (
    <Shadow style={styles.shadowPlay}>
      <Touchable
        style={{ ...styles.touchPlay, opacity: disabledControl ? 0.5 : 1 }}
        disabled={disabledControl}
        onPress={() => (play ? setStatusPlay(false) : setStatusPlay(true))}>
        {!play ? (
          <ViewStyle style={styles.viewPlay}>
            <PlaySVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </ViewStyle>
        ) : (
          <ViewStyle style={styles.viewPlay}>
            <PauseSVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </ViewStyle>
        )}
      </Touchable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  shadowPlay: {
    width: 85,
    height: 85,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    opacity: 1,
  },
  touchPlay: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPlay: {
    width: '100%',
    height: '100%',
  },
})
