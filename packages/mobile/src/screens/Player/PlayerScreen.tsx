import React, { useEffect, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { LinearGradient, View } from 'components'
import { Mountaint } from './Mountain'
import { IFavorites } from '@/store/interfaces'
import { CustomHeader } from '../components'
import { Library } from './Library'
import { PlayerContainer } from './PlayerContainer'
import { ToggleAllSound } from '@/store/actions/sounds'
import { useDispatch } from 'react-redux'
import { PlayerControlContainer } from './PlayerControl/PlayerControlContainer'
import { CheckForFavoriteContent } from '../Favorites/functions/checkForFavoriteContent'
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs'
import { NavigationHelpers, ParamListBase } from '@react-navigation/native'
import { useLanguage, usePlay, useTheme } from '@/hooks'

type Props = {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>
}

export const PlayerScreen = ({ navigation }: Props) => {
  const width = useWindowDimensions().width
  const [{ headerTitle }] = useLanguage()
  const [{ ITEM_COLOR }] = useTheme()
  const [{ playAll, soundsPlay, musicPlay }] = usePlay()
  const faves = useSelector<RootState>(state => state.favorites) as IFavorites
  const needStopPlay = useSelector<RootState>(
    state => state.timer.needStopPlay,
  ) as boolean
  const [play, setPlay] = useState<boolean>(playAll)
  const [disabledControl, setDisabledControl] = useState<boolean>(true)
  const [favorite, setFavorite] = useState<boolean>(
    CheckForFavoriteContent() ? true : false,
  )

  const dispatch = useDispatch()

  const setStatusPlay = (status: boolean) => {
    status ? setPlay(true) : setPlay(false)
    dispatch(
      ToggleAllSound({
        playAll: status,
      }),
    )
  }

  useEffect(() => {
    const result = CheckForFavoriteContent()
    result ? setFavorite(true) : setFavorite(false)
    soundsPlay.mixedSound.length
      ? (playAll ? setStatusPlay(true) : setPlay(false),
        setDisabledControl(false))
      : musicPlay._id
        ? setDisabledControl(false)
        : (setDisabledControl(true), setStatusPlay(false))
  }, [soundsPlay.mixedSound])

  useEffect(() => {
    if (needStopPlay) {
      setStatusPlay(false)
    }
  }, [needStopPlay])

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} label={headerTitle.player} />
      <LinearGradient style={styles.containerLG}>
        <Mountaint />
        <Library
          width={width * 0.95}
          navigation={navigation}
          favesLength={faves.favorites.length}
          itemColor={ITEM_COLOR}
          title={headerTitle.library}
        />
        <PlayerContainer navigation={navigation} />
        <PlayerControlContainer
          play={play}
          setStatusPlay={setStatusPlay}
          disabledControl={disabledControl}
          navigation={navigation}
          favorite={favorite}
          setFavorite={setFavorite}
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLG: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
