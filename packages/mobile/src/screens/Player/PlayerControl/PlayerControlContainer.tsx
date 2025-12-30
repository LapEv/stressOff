import { View } from '@/components'
import { StyleSheet } from 'react-native'
import { IPlayerControlContainer } from '../interfaces'
import { PlayerTimer } from './PlayerTimer'
import { PlayerControl } from './PlayerControl'
import { PlayerFavorites } from './PlayerFavorites'

export const PlayerControlContainer = ({
  play,
  setStatusPlay,
  disabledControl,
  navigation,
  favorite,
  setFavorite,
}: IPlayerControlContainer) => {
  return (
    <View style={styles.controlContainer}>
      <PlayerTimer navigation={navigation} disabledControl={disabledControl} />
      <PlayerControl
        disabledControl={disabledControl}
        play={play}
        setStatusPlay={setStatusPlay}
      />
      <PlayerFavorites
        disabledControl={disabledControl}
        navigation={navigation}
        favorite={favorite}
        setFavorite={setFavorite}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  controlContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 95,
  },
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
