import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { IMuscisTiles } from './interfaces'
import { RootState } from '@/store'
import { CheckFile, CheckFileSize, FileSizeToString } from '@/functions'
import { ChangeStateMusic } from '@/store/actions/music'
import { ToggleAllSound } from '@/store/actions/sounds'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { UpdateMusicsBookedDB, UpdateMusicsDB } from '@/store/actions/db'
import { modalShow } from '@/store/actions/modal'
import { dataApp } from '@/data/dataApp'
import { Shadow, Text, TextTitle, Touchable, View } from '@/components'
import { icons } from '@/data/contentApp'
import { BookedSVGNo, BookedSVGYes, Cloud, Mobile } from '@/assets/icons/SVG'
import { useDB, useLanguage, useTheme } from '@/hooks'

export const MusicTiles = ({
  id,
  _id,
  findUseMusic,
  item,
  img,
  title,
  description,
  location,
  storage,
  name,
  booked,
  globalCategory,
  newSound,
}: IMuscisTiles) => {
  const [, { UpdateMusicsStatusDB }] = useDB()
  const [{ modalMessages, newSoundText, Messages }] = useLanguage()
  const [{ bookedColor, CHECK_COLOR }] = useTheme()
  const musicStart = useSelector<RootState>(
    state => state.music.musicStart,
  ) as boolean
  const playAll = useSelector<RootState>(
    state => state.sound.playAll,
  ) as boolean
  const currentPlayingMusicId = useSelector<RootState>(
    state => state.music.id,
  ) as number
  const width = useWindowDimensions().width
  const [disabled, setDisabled] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(findUseMusic)

  useEffect(() => {
    !musicStart ? setDisabled(false) : null
  }, [musicStart])

  const addMusic = async (id: string) => {
    // updateStatusNewMusics(false, id, user.uid);
    UpdateMusicsStatusDB({ _id, newSound: true })
    console.log('disabled = ', disabled)
    const check = location === 'device' ? await CheckFile(item) : true
    check || location !== 'device'
      ? !playing
        ? (setPlaying(previousState => !previousState),
          dispatch(
            ChangeStateMusic({
              id: Number(id),
              playing: true,
              volume: 1.0,
              musicStart: true,
              startApp: false,
              booked: booked,
            }),
          ),
          dispatch(
            ToggleAllSound({
              playAll: true,
            }),
          ),
          dispatch(
            ChangeCurrentMixPlay({
              name: Messages.currentMix,
              id: 0,
            }),
          ),
          setDisabled(true))
        : (setPlaying(previousState => !previousState),
          dispatch(
            ChangeStateMusic({
              id: 0,
              playing: false,
              startApp: false,
            }),
          ),
          dispatch(
            ChangeCurrentMixPlay({
              name: Messages.currentMix,
              id: 0,
            }),
          ))
      : ((modalMessages.error.message = `${Messages.fileNotFound} ${Messages.switchToCloud}`),
        // await updateMusicsLocation('cloud', id, '', user._id),
        dispatch(UpdateMusicsDB({ name: name, sound: '', location: 'cloud' })),
        dispatch(modalShowMessage(modalMessages.error)))
  }

  useEffect(() => {
    currentPlayingMusicId !== Number(id) ? setPlaying(false) : setPlaying(true)
  }, [currentPlayingMusicId])

  const OpenDescription = (description: string, title: string) => {
    modalMessages.OpenDescription.title = title
    modalMessages.OpenDescription.message = description
    dispatch(modalShowMessage(modalMessages.OpenDescription))
  }

  const downloadFromCloud = async (
    storage: string,
    name: string,
    globalCategory: string,
  ) => {
    const size = await CheckSize(storage)
    modalMessages.downloadFromCloud.message = `${modalMessages.downloadFromCloud.message1} "${title}" ${modalMessages.downloadFromCloud.message2} \n${modalMessages.downloadFromCloud.size} ${size}`
    modalMessages.downloadFromCloud.storage = storage
    modalMessages.downloadFromCloud.name = name
    modalMessages.downloadFromCloud.category = globalCategory
    modalMessages.downloadFromCloud.id = id
    dispatch(modalShow(modalMessages.downloadFromCloud))
  }

  const deleteFromDevice = async (
    item: string,
    name: string,
    id: string,
    globalCategory: string,
  ) => {
    const sizeFile = (await CheckFileSize(item)) as number
    const size = FileSizeToString(sizeFile)
    modalMessages.deleteFromDevice.message = `${modalMessages.deleteFromDevice.message1} "${title}" ${modalMessages.deleteFromDevice.message2} \n${modalMessages.deleteFromDevice.size} ${size}`
    modalMessages.deleteFromDevice.sound = item
    modalMessages.deleteFromDevice.name = name
    modalMessages.deleteFromDevice.id = id
    modalMessages.deleteFromDevice.category = globalCategory
    dispatch(modalShow(modalMessages.deleteFromDevice))
  }

  const ToggleBookedMusics = async (id: string, booked: boolean) => {
    // await updateStatusMusicsBooked(!booked, id, user._id)
    dispatch(UpdateMusicsBookedDB({ id: id, booked: !booked }))
  }

  return (
    <View
      style={{
        ...styles.container,
        width: width / dataApp.FLATLIST.numberColumns,
      }}>
      {JSON.parse(newSound) ? (
        <View style={styles.new}>
          <TextTitle type="title_14" style={styles.newText}>
            {newSoundText}
          </TextTitle>
        </View>
      ) : null}
      {playing && playAll && (
        <View style={styles.check}>
          <ImageBackground
            source={icons.eqGif}
            style={styles.imgBack}
            resizeMode="contain"></ImageBackground>
        </View>
      )}
      {playing && !playAll && (
        <View style={styles.check}>
          <ImageBackground
            source={icons.eqPng}
            style={styles.imgBack}
            resizeMode="contain"></ImageBackground>
        </View>
      )}
      {location === 'cloud' && (
        <Touchable
          style={styles.location}
          onPressIn={() => downloadFromCloud(storage, name, globalCategory)}>
          <Cloud width="60%" height="60%" fill={CHECK_COLOR} />
        </Touchable>
      )}
      {location === 'device' && (
        <Touchable
          style={styles.location}
          onPressIn={() => deleteFromDevice(item, name, id, globalCategory)}>
          <Mobile width="60%" height="60%" fill={CHECK_COLOR} />
        </Touchable>
      )}
      {booked ? (
        <Touchable
          style={styles.booked}
          onPressIn={() => ToggleBookedMusics(id, booked)}>
          <BookedSVGYes width="60%" height="60%" fill={booked} />
        </Touchable>
      ) : (
        <Touchable
          style={styles.booked}
          onPressIn={() => ToggleBookedMusics(id, booked)}>
          <BookedSVGNo width="60%" height="60%" fill={bookedColor} />
        </Touchable>
      )}
      {description.length > 0 && (
        <View
          style={{
            ...styles.descriptionViewMain,
            borderColor: CHECK_COLOR,
          }}>
          <View
            style={{
              ...styles.descriptionView,
              borderColor: CHECK_COLOR,
            }}></View>
        </View>
      )}
      {playing && (
        <Touchable
          style={styles.touchContainer}
          onPress={() => addMusic(id)}
          onLongPress={() =>
            description.length > 0 ? OpenDescription(description, title) : null
          }>
          <Shadow
            style={{ ...styles.shadow, color: CHECK_COLOR }}
            distance={55}>
            <ImageBackground
              source={img}
              imageStyle={{
                borderRadius: 5,
                resizeMode: 'stretch',
                overflow: 'visible',
              }}
              style={{ width: 55, height: 55 }}
            />
          </Shadow>
        </Touchable>
      )}
      {!playing && (
        <Touchable
          style={styles.touchContainer}
          onPress={() => addMusic(id)}
          onLongPress={() =>
            description.length > 0 ? OpenDescription(description, title) : null
          }>
          <ImageBackground
            source={img}
            imageStyle={{
              borderRadius: 5,
              resizeMode: 'stretch',
              overflow: 'visible',
            }}
            style={{ width: 55, height: 55 }}
          />
        </Touchable>
      )}
      <Text type="text_14" style={styles.title}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    width: 110,
    height: 140,
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  shadow: {
    width: 55,
    height: 55,
    opacity: 0.8,
    borderRadius: 7,
    zIndex: 2,
    borderColor: 'red',
    borderWidth: 1,
  },
  touchContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 55,
    height: 55,
    zIndex: 1,
  },
  title: {
    fontFamily: 'open-regular',
    paddingTop: 10,
    textAlign: 'center',
  },
  check: {
    position: 'absolute',
    left: 20,
    top: -10,
    width: 30,
    height: 40,
    zIndex: 99,
  },
  new: {
    position: 'absolute',
    left: 20,
    top: -10,
    width: 40,
    height: 40,
    zIndex: 999,
    transform: [{ rotateX: '-45deg' }, { rotateZ: '-45deg' }],
  },
  newText: {
    fontFamily: 'open-bold',
    paddingTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  location: {
    position: 'absolute',
    right: 2,
    top: -10,
    width: 35,
    height: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    borderRadius: 50,
    borderWidth: 1,
  },
  booked: {
    position: 'absolute',
    left: 2,
    top: 40,
    width: 35,
    height: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBack: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionViewMain: {
    position: 'absolute',
    right: 25,
    bottom: 75,
    borderRadius: 10,
    borderWidth: 1,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionView: {
    width: 3,
    height: 3,
    borderWidth: 1,
    borderRadius: 10,
  },
})
