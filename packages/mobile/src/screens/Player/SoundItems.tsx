import React, { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import Slider from '@react-native-community/slider'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { ISoundsItems, URI } from './interfaces'
import {
  RemoveSound,
  TogglePlaySound,
  ToggleSoundVolume,
  ToggleStartSound,
} from '@/store/actions/sounds'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { GetImage } from '@/functions/getImage'
import {
  Shadow,
  SlideButton,
  Text,
  Touchable,
  View,
  ViewStyle,
} from '@/components'
import {
  BookedSVGNo,
  BookedSVGYes,
  CheckSVG,
  CloseItemSVG,
} from '@/assets/icons/SVG'
import {
  useDB,
  useLanguage,
  useModalMeessage,
  usePlay,
  useTheme,
} from '@/hooks'
// import { SlideButton, SlideDirection } from 'react-native-slide-button';

export const SoundItems = ({ item }: ISoundsItems) => {
  const [{ modalMessages, Messages, nameLanguage }] = useLanguage()
  const [{ sounds }] = useDB()
  const [theme] = useTheme()
  const [, { showModalMessage }] = useModalMeessage()
  const [{ playAll, soundsPlay }] = usePlay()

  const [volume, setVolumeState] = useState<number>(item.volume)
  // eslint-disable-next-line
  const [sound, setSound] = useState<any>()
  const width = useWindowDimensions().width

  const dispatch = useDispatch()

  const playSound = async (item: URI) => {
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

    setSound(sound)
    dispatch(
      ToggleStartSound({
        soundStart: false,
      }),
    )
    !soundsPlay.soundStart ? await sound.playAsync() : sound.pauseAsync()
  }

  const setStatePlaying = async (status: boolean) => {
    status ? await sound.playAsync() : await sound.pauseAsync()
  }

  const setVolume = async (id: string, value: number) => {
    await sound.setVolumeAsync(value)
    dispatch(
      ToggleSoundVolume({
        _id: _id,
        volume: value,
      }),
    )
  }

  const changePlayStatusSound = (_id: string) => {
    dispatch(
      TogglePlaySound({
        _id: _id,
      }),
    )
    playAll && sound
      ? item.playing
        ? setStatePlaying(true)
        : setStatePlaying(false)
      : null
  }

  const removeSound = (_id: string) => {
    dispatch(
      RemoveSound({
        _id: _id,
      }),
    )
    dispatch(
      ChangeCurrentMixPlay({
        name: Messages.currentMix,
        _id: '',
      }),
    )
  }

  useEffect(() => {
    sound
      ? playAll
        ? item.playing
          ? setStatePlaying(true)
          : null
        : !item.playAll
          ? setStatePlaying(false)
          : null
      : null
  }, [playAll])

  console.log('item = ', item)

  useEffect(() => {
    item.location === 'device' || item.location === 'app'
      ? playSound({ uri: item.storage })
      : GetImage(item.storage)
          .then(url => {
            playSound({ uri: url as string })
          })
          .catch(error => {
            removeSound(item._id)
            modalMessages.error.message = `${error.code}\n${error}`
            showModalMessage(modalMessages.error)
          })
  }, [])

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const shadowOpt = {
    width: width * 0.95,
    height: 70,
    color: theme.BACKGROUNDCOLOR,
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

  const ToggleBookedSounds = async (_id: string, booked: boolean) => {
    console.log('_id = ', _id)
    console.log('booked = ', booked)
    // await updateStatusSoundsBooked(!booked, id, user.uid)
    // dispatch(UpdateSoundsBookedDB({ id: id, booked: !booked }))
    // dispatch(ToggleBookedSound({ id: id, booked: !booked }))
  }

  console.log('sounds = ', sounds[0])

  return (
    <View style={styles.containerItem}>
      <Shadow style={shadowOpt}>
        <ViewStyle
          style={{ borderColor: theme.borderColorRGBA, ...styles.view }}>
          <Touchable
            style={styles.touchable}
            onPress={() => removeSound(item.id)}>
            <CloseItemSVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </Touchable>
        </ViewStyle>
        <SlideButton
          onSlideSuccess={() => {}}
          slideDirection={'left'}
          style={{
            width: width * 0.95,
          }}>
          <Shadow style={item.playing ? shadowOptYes : shadowOptNo}>
            <ViewStyle
              style={{
                ...styles.screen,
                borderColor: item.playing
                  ? theme.borderColorRGBA2
                  : theme.borderColorRGBA,
              }}>
              <ImageBackground
                source={item.img}
                imageStyle={{ borderRadius: 5 }}
                style={[styles.image, { opacity: playAll ? 1 : 0.5 }]}
              />
              <View style={{ ...styles.viewImage, width: width * 0.5 }}>
                <Text type="text_14" style={styles.textMessages}>
                  {item.title[nameLanguage as keyof typeof item.title]}
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
                    setVolume(item._id, value)
                  }}
                />
              </View>
              <View style={{ opacity: item.playing ? 1 : 0.5 }}>
                <Touchable
                  style={styles.touchablePlaying}
                  onPress={() => changePlayStatusSound(item._id)}>
                  <CheckSVG
                    width="100%"
                    height="100%"
                    fill={theme.ITEM_COLOR}
                  />
                </Touchable>
              </View>
              <Touchable
                onPress={() =>
                  ToggleBookedSounds(item._id, item.booked as boolean)
                }>
                {item.booked ? (
                  <View style={styles.viewBooked}>
                    <BookedSVGYes
                      width="100%"
                      height="100%"
                      fill={theme.bookedColor}
                    />
                  </View>
                ) : (
                  <View style={styles.viewBooked}>
                    <BookedSVGNo
                      width="100%"
                      height="100%"
                      fill={theme.bookedColor}
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
