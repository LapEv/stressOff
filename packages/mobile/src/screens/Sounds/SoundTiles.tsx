import { dataApp } from '@/data/dataApp'
import { UpdateSoundsBookedDB } from '@/store/actions/db'
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native'
import { ISoundsTiles } from './interfaces'
import { CheckFileSize, FileSizeToString } from '@/functions'
import { Shadow, Text, TextTitle, Touchable, View } from '@/components'
import { icons } from '@/data/contentApp'
import { BookedSVGNo, BookedSVGYes, Cloud, Mobile } from '@/assets/icons/SVG'
import {
  useDB,
  useLanguage,
  useModal,
  useModalMeessage,
  usePlay,
  useTheme,
} from '@/hooks'
import { useFavorite } from '@/hooks/favorite/useFavorite'

export const SoundsTiles = ({
  id,
  _id,
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
  newSound,
}: ISoundsTiles) => {
  const [, { UpdateSoundsStatusDB }] = useDB()
  const [{ playAll, soundsPlay }, { ToggleAllSound, AddSound, RemoveSound }] =
    usePlay()
  const [, { ChangeCurrentMixPlay }] = useFavorite()
  const [{ newSoundText, modalMessages, currentMixLabel }] = useLanguage()
  const [{ bookedColor, CHECK_COLOR }] = useTheme()
  const [, { showModalMessage }] = useModalMeessage()
  const [, { showModal }] = useModal()
  const [playing, setPlaying] = useState(findUseSound)
  const width = useWindowDimensions().width

  useEffect(() => {
    setPlaying(findUseSound)
  }, [soundsPlay.mixedSound])

  const addSound = async () => {
    if (soundsPlay.mixedSound.length + 1 >= dataApp.maxSounds) {
      showModalMessage(modalMessages.maxSounds)
      return
    }
    UpdateSoundsStatusDB({ _id, newSound: false })
    // const check = location === 'device' ? await CheckFile(item) : true
    // check || location !== 'device'
    //   ?
    !findUseSound
      ? (setPlaying(previousState => !previousState),
        ToggleAllSound({ playAll: true }),
        AddSound({
          _id: _id,
          playing: true,
          volume: 1.0,
          booked,
        }),
        ChangeCurrentMixPlay({
          name: currentMixLabel,
          _id,
        }))
      : (setPlaying(previousState => !previousState),
        RemoveSound({ _id: _id }),
        ChangeCurrentMixPlay({
          name: currentMixLabel,
          _id: '',
        }))
    //   : ((language.modalMessages.error.message = `${language.Messages.fileNotFound} ${language.Messages.switchToCloud}`),
    //     // await updateSoundsLocation('cloud', id, '', user._id),
    //     dispatch(UpdateSoundsDB({ name: name, sound: '', location: 'cloud' })),
    //     showModal(language.modalMessages.error))
  }

  const findPlaySound = soundsPlay.mixedSound.find(value => value._id === _id)
  const playSound = findPlaySound ? findPlaySound.playing : undefined

  const OpenDescription = (description: string, title: string) => {
    modalMessages.OpenDescription.title = title
    modalMessages.OpenDescription.message = description
    showModalMessage(modalMessages.OpenDescription)
  }

  const downloadFromCloud = async (
    storage: string,
    name: string,
    globalCategory: string,
  ) => {
    const size = (await CheckSize(storage)) ?? ''
    modalMessages.downloadFromCloud.message = `${modalMessages.downloadFromCloud.message1} "${title}" ${modalMessages.downloadFromCloud.message2} \n${modalMessages.downloadFromCloud.size} ${size}`
    modalMessages.downloadFromCloud.storage = storage
    modalMessages.downloadFromCloud.name = name
    modalMessages.downloadFromCloud.category = globalCategory
    modalMessages.downloadFromCloud.id = id
    showModal(modalMessages.downloadFromCloud)
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
    showModal(modalMessages.deleteFromDevice)
  }

  const ToggleBookedSounds = async (id: string, booked: boolean) => {
    // await updateStatusSoundsBooked(!booked, id, user._id)
    dispatch(UpdateSoundsBookedDB({ id: id, booked: !booked }))
  }

  return (
    <View
      type="check"
      style={{
        ...styles.container,
        width: width / dataApp.FLATLIST.numberColumns,
      }}>
      {newSound ? (
        <View style={styles.new}>
          <TextTitle type="title_14" colorType="check" style={styles.newText}>
            {newSoundText}
          </TextTitle>
        </View>
      ) : null}
      {playing && playSound && playAll && (
        <View style={styles.check}>
          <ImageBackground
            style={{ width: '80%', height: '100%' }}
            imageStyle={{
              borderRadius: 5,
              resizeMode: 'stretch',
              overflow: 'visible',
            }}
            source={icons.eqGif}
          />
        </View>
      )}
      {playing && playSound && !playAll && (
        <View style={styles.check}>
          <ImageBackground
            style={{ width: '80%', height: '100%' }}
            source={icons.eqPng}
            imageStyle={{
              borderRadius: 5,
              resizeMode: 'stretch',
              overflow: 'visible',
            }}
          />
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
          onPressIn={() => ToggleBookedSounds(id, booked)}>
          <BookedSVGYes width="60%" height="60%" fill={bookedColor} />
        </Touchable>
      ) : (
        <Touchable
          style={styles.booked}
          onPressIn={() => ToggleBookedSounds(id, booked)}>
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
          onPress={addSound}
          onLongPress={() =>
            description.length > 0 ? OpenDescription(description, title) : null
          }>
          <Shadow style={styles.shadow} startColor={CHECK_COLOR} distance={5}>
            <ImageBackground
              source={img}
              imageStyle={{
                borderRadius: 5,
                resizeMode: 'stretch',
                overflow: 'visible',
              }}
              style={{ width: 55, height: 55, zIndex: 3 }}
            />
          </Shadow>
        </Touchable>
      )}
      {!playing && (
        <Touchable
          style={styles.touchContainer}
          onPress={addSound}
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
    zIndex: 2,
  },
  shadow: {
    width: 55,
    height: 55,
    opacity: 1,
    borderRadius: 7,
    zIndex: 4,
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
