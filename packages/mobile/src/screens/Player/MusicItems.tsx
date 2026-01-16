import React, { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '@react-native-community/slider'
import { IMusicItems, URI } from './interfaces'
import { RootState } from 'store'
import { IMUSICS, IMusicState } from '@/store/interfaces'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import { ChangeStateMusic } from '@/store/actions/music'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import {
  Shadow,
  SlideButton,
  Text,
  Touchable,
  View,
  ViewStyle,
} from '@/components'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { GetImage } from '@/functions/getImage'
import {
  BookedSVGNo,
  BookedSVGYes,
  CheckSVG,
  CloseItemSVG,
} from '@/assets/icons/SVG'
import { ITheme } from '@/theme/interfaces'
import { useLanguage } from '@/hooks'

export const MusicItems = ({ id, booked }: IMusicItems) => {
  const [{ modalMessages, Messages, name }] = useLanguage()
  const width = useWindowDimensions().width
  const playingMusic = useSelector<RootState>(
    state => state.music,
  ) as IMusicState
  const playSoundsAll = useSelector<RootState>(state => state.sound.playAll)
  const [volume, setVolumeState] = useState<number>(
    playingMusic.volume as number,
  )
  const [sound, setMusic] = useState<Sound | null>(null)
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const musicDB = useSelector<RootState>(state => state.db.musics) as IMUSICS[]

  const dispatch = useDispatch()

  const playMusic = async (item: URI) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
    })

    const { sound } = await Audio.Sound.createAsync(item, {
      isLooping: true,
    })

    setMusic(sound)
    dispatch(
      ChangeStateMusic({
        musicStart: false,
        startApp: false,
        volume,
        id: playingMusic.id,
        playing: playingMusic.playing,
      }),
    )
    !playingMusic.startApp
      ? await sound?.playAsync()
      : await sound?.pauseAsync()
  }

  const setStatePlaying = async (status: boolean) => {
    status ? await sound?.playAsync() : await sound?.pauseAsync()
  }

  const setVolume = async (value: number) => {
    await sound?.setVolumeAsync(value)
    dispatch(
      ChangeStateMusic({
        volume: value,
        id: playingMusic.id,
        playing: playingMusic.playing,
        startApp: playingMusic.startApp,
        musicStart: playingMusic.musicStart,
      }),
    )
  }

  const changePlayStatusSound = (id: number) => {
    dispatch(
      ChangeStateMusic({
        id: id,
        playing: !playingMusic.playing ? true : false,
        volume: volume,
        startApp: false,
        musicStart: playingMusic.musicStart,
      }),
    )
    playSoundsAll && sound
      ? playingMusic.playing
        ? setStatePlaying(false)
        : setStatePlaying(true)
      : null
  }

  const removeSound = () => {
    dispatch(
      ChangeStateMusic({
        id: 0,
        playing: false,
        startApp: false,
        volume: playingMusic.volume,
        musicStart: playingMusic.musicStart,
      }),
    )
    dispatch(
      ChangeCurrentMixPlay({
        name: Messages.currentMix,
        id: 0,
      }),
    )
  }

  useEffect(() => {
    sound
      ? playSoundsAll
        ? playingMusic.playing
          ? setStatePlaying(true)
          : null
        : setStatePlaying(false)
      : null
  }, [playSoundsAll])

  useEffect(() => {
    musicDB[id - 1].location === 'device' || musicDB[id - 1].location === 'app'
      ? playMusic({ uri: musicDB[id - 1].sound })
      : GetImage(musicDB[id - 1].storage)
          .then((value: unknown) => {
            playMusic({ uri: value as string })
          })
          .catch(error => {
            removeSound()
            modalMessages.error.message = `${error.code}\n${error}`
            dispatch(modalShowMessage(modalMessages.error))
          })
  }, [playingMusic.id])

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const shadowOpt = {
    width: width * 0.95,
    height: 72,
    border: 7,
    radius: 15,
    opacity: 1,
    x: 0,
    y: 0,
    style: {
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 20,
    },
  }

  const shadowOptNo = {
    width: width * 0.95,
    height: 70,
    color: theme.BACKGROUNDCOLOR,
    border: 6,
    radius: 15,
    opacity: 1,
    x: 0,
    y: 0,
    style: {
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  }

  const shadowOptYes = {
    width: width * 0.95,
    height: 70,
    color: theme.CHECK_COLOR,
    border: 6,
    radius: 15,
    opacity: 0.5,
    x: 0,
    y: 0,
    style: {
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // marginTop: 20,
    },
  }

  const ToggleBookedMusics = async (id: number, booked: boolean) => {
    console.log('id = ', id)
    console.log('booked = ', booked)
    // await updateStatusMusicsBooked(!booked, id, user.uid)
    // dispatch(UpdateMusicsBookedDB({ id: id, booked: !booked }))
    // dispatch(ChangeStateMusic({ booked: !booked }))
  }

  return (
    <View style={styles.containerItem}>
      <Shadow style={shadowOpt}>
        <ViewStyle
          style={{ borderColor: theme.borderColorRGBA, ...styles.view }}>
          <Touchable style={styles.touchable} onPress={removeSound}>
            <CloseItemSVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </Touchable>
        </ViewStyle>
        <SlideButton
          onSlideSuccess={() => {}}
          slideDirection={'left'}
          style={{
            width: width * 0.95,
          }}>
          <Shadow style={playingMusic.playing ? shadowOptYes : shadowOptNo}>
            <ViewStyle
              style={{
                ...styles.screen,
                borderColor: playingMusic.playing
                  ? theme.borderColorRGBA2
                  : theme.borderColorRGBA,
              }}>
              <ImageBackground
                source={{ uri: musicDB[id - 1].img }}
                imageStyle={{ borderRadius: 5 }}
                style={[styles.image, { opacity: playSoundsAll ? 1 : 0.5 }]}
              />
              <View style={{ ...styles.viewImage, width: width * 0.5 }}>
                <Text type="text_14" style={styles.textMessages}>
                  {JSON.parse(musicDB[id - 1].title)[name]}
                </Text>
                <Slider
                  style={{ width: '100%', height: 30 }}
                  minimumValue={0}
                  maximumValue={1.0}
                  thumbTintColor={theme.TEXT_COLOR}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  value={volume}
                  onValueChange={setVolumeState}
                  onSlidingComplete={value => {
                    setVolume(value)
                  }}
                />
              </View>
              <View style={{ opacity: playingMusic.playing ? 1 : 0.5 }}>
                <Touchable
                  style={styles.touchablePlaying}
                  onPress={() => changePlayStatusSound(id)}>
                  <CheckSVG
                    width="100%"
                    height="100%"
                    fill={theme.ITEM_COLOR}
                  />
                </Touchable>
              </View>
              <Touchable
                onPress={() => ToggleBookedMusics(id, booked as boolean)}>
                {booked ? (
                  <View
                    style={{
                      ...styles.viewBooked,
                      opacity: playingMusic.playing ? 1 : 0.5,
                    }}>
                    <BookedSVGYes
                      width="100%"
                      height="100%"
                      fill={theme.booked}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      ...styles.viewBooked,
                      opacity: playingMusic.playing ? 1 : 0.5,
                    }}>
                    <BookedSVGNo
                      width="100%"
                      height="100%"
                      fill={theme.booked}
                    />
                  </View>
                )}
              </Touchable>
            </ViewStyle>
          </Shadow>
        </SlideButton>
      </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  screen: {
    width: '100%',
    height: 70,
    padding: 10,
    borderRadius: 15,
    opacity: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  textMessages: {
    opacity: 0.9,
    paddingTop: 10,
    paddingLeft: 15,
    width: '100%',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },
  view: {
    width: '100%',
    height: 70,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  touchable: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablePlaying: {
    width: 40,
    height: 40,
  },
  viewBooked: {
    width: 33,
    height: 33,
  },
})
