import { dataApp } from '@/data/dataApp'
import { ILocalizationOptions } from '@/localization/interfaces'
import { RootState } from '@/store'
import { UpdateSoundsBookedDB, UpdateSoundsDB } from '@/store/actions/db'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { AddSound, RemoveSound, ToggleAllSound } from '@/store/actions/sounds'
import { ISoundStateItems } from '@/store/interfaces'
import { ITheme } from '@/theme/interfaces'
import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ISoundsTiles } from './interfaces'
import { CheckFile, CheckFileSize, FileSizeToString } from '@/functions'
import { modalShow } from '@/store/actions/modal'
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

export const SoundsTiles = ({
  id,
  findUseSound,
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
}: ISoundsTiles) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const soundStart = useSelector<RootState>(
    state => state.sound.soundStart,
  ) as boolean
  const playAll = useSelector<RootState>(
    state => state.sound.playAll,
  ) as boolean
  const playingDataSound = useSelector<RootState>(
    state => state.sound.mixedSound,
  ) as ISoundStateItems[]
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const [playing, setPlaying] = useState(findUseSound)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [newSound, setNewSound] = useState(newSnd)
  const width = useWindowDimensions().width

  useEffect(() => {
    setPlaying(findUseSound)
  }, [playingDataSound])

  useEffect(() => {
    !soundStart ? setDisabled(false) : null
    console.log(disabled)
  }, [soundStart])

  const dispatch = useDispatch()
  const addSound = async (id: string, findUseSound: boolean) => {
    // updateStatusNewSounds(false, id, user.uid);
    // dispatch(UpdateSoundsStatusDB({ name: name, new: false }));
    if (playingDataSound.length + 1 >= dataApp.maxSounds) {
      console.log('empty')
    }
    setNewSound(false)
    const check = location === 'device' ? await CheckFile(item) : true
    check || location !== 'device'
      ? !findUseSound
        ? (setPlaying(previousState => !previousState),
          dispatch(
            ToggleAllSound({
              playAll: true,
            }),
          ),
          dispatch(
            AddSound({
              id: id,
              playing: true,
              volume: 1.0,
              booked: booked,
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
            RemoveSound({
              id: Number(id),
            }),
          ),
          dispatch(
            ChangeCurrentMixPlay({
              name: language.Messages.currentMix,
              id: 0,
            }),
          ))
      : ((language.modalMessages.error.message = `${language.Messages.fileNotFound} ${language.Messages.switchToCloud}`),
        // await updateSoundsLocation('cloud', id, '', user._id),
        dispatch(UpdateSoundsDB({ name: name, sound: '', location: 'cloud' })),
        dispatch(modalShowMessage(language.modalMessages.error)))
  }

  const shadowOpt = {
    width: 55,
    height: 55,
    color: theme.CHECK_COLOR,
    border: 7,
    radius: 10,
    opacity: 0.8,
    x: 0,
    y: 0,
    style: { marginVertical: 0 },
  }

  const findPlaySound = playingDataSound.find(value => value.id === Number(id))
  const playSound = findPlaySound ? findPlaySound.playing : undefined

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
    const size = (await CheckSize(storage)) ?? ''
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

  const ToggleBookedSounds = async (id: string, booked: boolean) => {
    // await updateStatusSoundsBooked(!booked, id, user._id)
    dispatch(UpdateSoundsBookedDB({ id: id, booked: !booked }))
  }

  console.log('img = ', img)
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
      {playing && playSound && playAll && (
        <View style={styles.check}>
          <Image
            style={{ width: '80%', height: '100%', resizeMode: 'stretch' }}
            source={icons.eqGif}
          />
        </View>
      )}
      {playing && playSound && !playAll && (
        <View style={styles.check}>
          <Image
            style={{ width: '80%', height: '100%', resizeMode: 'stretch' }}
            source={icons.eqPng}
            // imageStyle={{
            //   borderRadius: 5,
            //   resizeMode: 'stretch',
            //   overflow: 'visible',
            // }}
          />
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
          onPressIn={() => ToggleBookedSounds(id, booked)}>
          <BookedSVGYes width="60%" height="60%" fill={theme.booked} />
        </Touchable>
      ) : (
        <Touchable
          style={styles.booked}
          onPressIn={() => ToggleBookedSounds(id, booked)}>
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
          onPress={() => addSound(id, findUseSound)}
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
      {!playing && (
        <Touchable
          style={styles.touchContainer}
          onPress={() => addSound(id, findUseSound)}
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
    paddingTop: 5,
    textAlign: 'center',
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
