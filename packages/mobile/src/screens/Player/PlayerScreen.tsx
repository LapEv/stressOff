import React, { useEffect, useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { NavigationPropPlayer } from 'navigations'
import { ITheme } from 'theme/interfaces'
import { ILocalizationOptions } from 'localization/interfaces'
import { LinearGradient, View } from 'components'
import { Mountaint } from './Mountain'
import { IFavorites } from '@/store/interfaces'
import { CustomHeader } from '../components'
import { Library } from './Library'
import { PlayerContainer } from './PlayerContainer'
import { ISoundsItems } from './interfaces'
import { ToggleAllSound } from '@/store/actions/sounds'
import { useDispatch } from 'react-redux'
import { PlayerControlContainer } from './PlayerControl/PlayerControlContainer'
import { CheckForFavoriteContent } from '../Favorites/functions/checkForFavoriteContent'

type Props = {
  navigation: NavigationPropPlayer
}

export const PlayerScreen = ({ navigation }: Props) => {
  const width = useWindowDimensions().width
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const playingMusicId = useSelector<RootState>(
    state => state.music.id,
  ) as number
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const faves = useSelector<RootState>(state => state.favorites) as IFavorites
  const playingDataSound = useSelector<RootState>(
    state => state.sound.mixedSound,
  ) as ISoundsItems[]
  const playSoundsAll = useSelector<RootState>(
    state => state.sound.playAll,
  ) as boolean
  const needStopPlay = useSelector<RootState>(
    state => state.timer.needStopPlay,
  ) as boolean
  const [play, setPlay] = useState<boolean>(playSoundsAll)
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
    playingDataSound.length
      ? (playSoundsAll ? setStatusPlay(true) : setPlay(false),
        setDisabledControl(false))
      : playingMusicId > 0
        ? setDisabledControl(false)
        : (setDisabledControl(true), setStatusPlay(false))
  }, [playingDataSound])

  useEffect(() => {
    if (needStopPlay) {
      setStatusPlay(false)
    }
  }, [needStopPlay])

  return (
    <View style={styles.container}>
      <CustomHeader
        navigation={navigation}
        label={language.headerTitle.player}
      />
      <LinearGradient style={styles.containerLG}>
        <Mountaint />
        <Library
          width={width * 0.95}
          navigation={navigation}
          favesLength={faves.favorites.length}
          itemColor={theme.ITEM_COLOR}
          title={language.headerTitle.library}
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
