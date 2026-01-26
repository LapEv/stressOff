import React, { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import { typeElevation } from '@/components/Shadow/typeElevaion'
import {
  Shadow,
  Text,
  TextTitle,
  Touchable,
  View,
  ViewStyle,
} from '@/components'
import { mixData } from '@/data/contentApp'
import { CloseItemSVG, EditSVG } from '@/assets/icons/SVG'
import { useDB, useLanguage, useModal, useTheme } from '@/hooks'
import { useFavorite } from '@/hooks/favorite/useFavorite'

export const FavoritesTiles = ({ item, use }) => {
  const [{ nameLanguage, modalMessages }] = useLanguage()
  const [{ sounds, musics }] = useDB()
  const [{ borderColorRGBA, borderColorRGBA2, ITEM_COLOR }] = useTheme()
  const [, { showModal }] = useModal()
  // const [{ favorites, currentMix }, { ChangeCurrentMixPlay }] = useFavorite()
  const [{ currentMix }] = useFavorite()

  const width = useWindowDimensions().width
  const [playing, setPlaying] = useState(use)

  const _music = musics[item.StateMusic.id - 1]
    ? `${JSON.parse(musics[item.StateMusic.id - 1]?.title)[nameLanguage]}`
    : ''
  const mixedsounds = item.StateSound.mixedSound
    .map(
      sound =>
        ' ' + JSON.parse(sounds[Number(sound.id) - 1].title)[nameLanguage],
    )
    .toString()
  const _sounds = mixedsounds ? (_music ? `,${mixedsounds}` : mixedsounds) : ''
  const textMessage = _music + _sounds

  const editMix = (id: string) => {
    const modalInfo = Object.assign({ id: id }, modalMessages.editFavoriteMix)
    showModal(modalInfo)
  }

  const removeMix = (id: string) => {
    const modalInfo = Object.assign(
      { id: id, name: item.name },
      modalMessages.removeFavoriteMix,
      {
        message: `${modalMessages.removeFavoriteMix.message} "${item.name}"?`,
      },
    )
    showModal(modalInfo)
  }

  // const PlayFavorite = (id: number) => {
  const PlayFavorite = () => {
    // favorites[id - 1].StateSound
    //   ? dispatch(AddFavoritesSound(favorites[id - 1].StateSound))
    //   : null
    // favorites[id - 1].StateMusic
    //   ? dispatch(ChangeStateMusic(favorites[id - 1].StateMusic))
    //   : null
    // ChangeCurrentMixPlay({
    //   name: favorites[id - 1].name,
    //   _id: favorites[id - 1]._id,
    // })
  }

  useEffect(() => {
    setPlaying(use ? true : false)
  }, [currentMix])

  const shadowOptNo = {
    width: width * 0.95,
    height: 70,
    border: 6,
    opacity: 1,
    style: {
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  const shadowOptYes = {
    width: width * 0.95,
    height: 70,
    border: 6,
    opacity: 0.5,
    style: {
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  return (
    <View style={styles.containerItem}>
      <Shadow style={playing ? shadowOptYes : shadowOptNo}>
        <ViewStyle
          style={{
            ...styles.screen,
            borderColor: playing ? borderColorRGBA2 : borderColorRGBA,
            borderWidth: 1,
          }}>
          <Touchable style={styles.touch} onPress={() => PlayFavorite(item.id)}>
            <View style={{ ...styles.viewImg, width: width * 0.15 }}>
              <ImageBackground
                source={mixData.img}
                imageStyle={{ borderRadius: 5 }}
                style={styles.image}
              />
            </View>
            <View style={{ ...styles.viewText, width: width * 0.5 }}>
              <TextTitle type="title_20b" numberOfLines={1}>
                {item.name}
              </TextTitle>
              <Text type="text_12" numberOfLines={2}>
                {textMessage}
              </Text>
            </View>
          </Touchable>
          <Touchable style={styles.touchEdit} onPress={() => editMix(item.id)}>
            <EditSVG width="55%" height="55%" fill={ITEM_COLOR} />
          </Touchable>
          <Touchable
            style={styles.touchClose}
            onPress={() => removeMix(item.id)}>
            <CloseItemSVG width="55%" height="55%" fill={ITEM_COLOR} />
          </Touchable>
        </ViewStyle>
      </Shadow>
    </View>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  screen: {
    width: '99.5%',
    height: 70,
    borderStyle: 'solid',
    borderRadius: 15,
    opacity: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...typeElevation,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  viewText: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  touchEdit: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchClose: {
    width: 40,
    height: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
