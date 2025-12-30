import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IMuscisTiles } from './interfaces'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import { CheckFile, CheckFileSize, FileSizeToString } from '@/functions'
import { ChangeStateMusic } from '@/store/actions/music'
import { ToggleAllSound } from '@/store/actions/sounds'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { UpdateMusicsBookedDB, UpdateMusicsDB } from '@/store/actions/db'
import { modalShow } from '@/store/actions/modal'
import { dataApp } from '@/data/dataApp'
import {
  Shadow,
  Text,
  TextTitle,
  Touchable,
  View,
  ViewStyle,
} from '@/components'
import { icons } from '@/data/contentApp'
import { BookedSVGNo, BookedSVGYes, Cloud, Mobile } from '@/assets/icons/SVG'

export const MusicTiles = ({
  id,
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
  newSnd,
}: IMuscisTiles) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const musicStart = useSelector<RootState>(
    state => state.music.musicStart,
  ) as boolean
  const playAll = useSelector<RootState>(
    state => state.sound.playAll,
  ) as boolean
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const currentPlayingMusicId = useSelector<RootState>(
    state => state.music.id,
  ) as number
  const width = useWindowDimensions().width
  const [disabled, setDisabled] = useState<boolean>(false)
  const [newSound, setNewSound] = useState<boolean>(newSnd)
  const [playing, setPlaying] = useState<boolean>(findUseMusic)

  useEffect(() => {
    !musicStart ? setDisabled(false) : null
    console.log('disabled = ', disabled)
  }, [musicStart])

  const dispatch = useDispatch()
  const addMusic = async (id: string) => {
    // updateStatusNewMusics(false, id, user.uid);
    // dispatch(UpdateMusicsStatusDB({ name: name, new: false }));
    setNewSound(false)
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
              name: language.Messages.currentMix,
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
              name: language.Messages.currentMix,
              id: 0,
            }),
          ))
      : ((language.modalMessages.error.message = `${language.Messages.fileNotFound} ${language.Messages.switchToCloud}`),
        // await updateMusicsLocation('cloud', id, '', user._id),
        dispatch(UpdateMusicsDB({ name: name, sound: '', location: 'cloud' })),
        dispatch(modalShowMessage(language.modalMessages.error)))
  }

  useEffect(() => {
    currentPlayingMusicId !== Number(id) ? setPlaying(false) : setPlaying(true)
  }, [currentPlayingMusicId])

  const shadowOpt = {
    width: 55,
    height: 55,
    color: '#15a522',
    border: 7,
    radius: 10,
    opacity: 0.8,
    x: 0,
    y: 0,
    style: { marginVertical: 0 },
  }

  const OpenDescription = (description: string, title: string) => {
    language.modalMessages.OpenDescription.title = title
    language.modalMessages.OpenDescription.message = description
    dispatch(modalShowMessage(language.modalMessages.OpenDescription))
  }

  const downloadFromCloud = async (
    storage: string,
    name: string,
    globalCategory: string,
  ) => {
    const size = await CheckSize(storage)
    language.modalMessages.downloadFromCloud.message = `${language.modalMessages.downloadFromCloud.message1} "${title}" ${language.modalMessages.downloadFromCloud.message2} \n${language.modalMessages.downloadFromCloud.size} ${size}`
    language.modalMessages.downloadFromCloud.storage = storage
    language.modalMessages.downloadFromCloud.name = name
    language.modalMessages.downloadFromCloud.category = globalCategory
    language.modalMessages.downloadFromCloud.id = id
    dispatch(modalShow(language.modalMessages.downloadFromCloud))
  }

  const deleteFromDevice = async (
    item: string,
    name: string,
    id: string,
    globalCategory: string,
  ) => {
    const sizeFile = (await CheckFileSize(item)) as number
    const size = FileSizeToString(sizeFile)
    language.modalMessages.deleteFromDevice.message = `${language.modalMessages.deleteFromDevice.message1} "${title}" ${language.modalMessages.deleteFromDevice.message2} \n${language.modalMessages.deleteFromDevice.size} ${size}`
    language.modalMessages.deleteFromDevice.sound = item
    language.modalMessages.deleteFromDevice.name = name
    language.modalMessages.deleteFromDevice.id = id
    language.modalMessages.deleteFromDevice.category = globalCategory
    dispatch(modalShow(language.modalMessages.deleteFromDevice))
  }

  const ToggleBookedMusics = async (id: string, booked: boolean) => {
    // await updateStatusMusicsBooked(!booked, id, user._id)
    dispatch(UpdateMusicsBookedDB({ id: id, booked: !booked }))
  }

  return (
    <ViewStyle
      style={
        (styles.container, { width: width / dataApp.FLATLIST.numberColumns })
      }>
      {newSound ? (
        <View style={styles.new}>
          <TextTitle type="title_14" style={styles.newText}>
            {language.newSound}
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
          <Cloud width="60%" height="60%" fill={theme.CHECK_COLOR} />
        </Touchable>
      )}
      {location === 'device' && (
        <Touchable
          style={styles.location}
          onPressIn={() => deleteFromDevice(item, name, id, globalCategory)}>
          <Mobile width="60%" height="60%" fill={theme.CHECK_COLOR} />
        </Touchable>
      )}
      {booked ? (
        <Touchable
          style={styles.booked}
          onPressIn={() => ToggleBookedMusics(id, booked)}>
          <BookedSVGYes width="60%" height="60%" fill={theme.booked} />
        </Touchable>
      ) : (
        <Touchable
          style={styles.booked}
          onPressIn={() => ToggleBookedMusics(id, booked)}>
          <BookedSVGNo width="60%" height="60%" fill={theme.booked} />
        </Touchable>
      )}
      {description.length > 0 && (
        <View
          style={{
            ...styles.descriptionViewMain,
            borderColor: theme.CHECK_COLOR,
          }}>
          <View
            style={{
              ...styles.descriptionView,
              borderColor: theme.CHECK_COLOR,
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
          <Shadow style={shadowOpt}>
            <ImageBackground
              source={{ uri: img }}
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
      {playing && (
        <Touchable
          style={styles.touchContainer}
          onPress={() => addMusic(id)}
          onLongPress={() =>
            description.length > 0 ? OpenDescription(description, title) : null
          }>
          <ImageBackground
            source={{ uri: img }}
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
    </ViewStyle>
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
    alignItems: 'center',
    zIndex: 1,
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
