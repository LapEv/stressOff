import React, { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { typeElevation } from '@/components/Shadow/typeElevaion'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { IFavorites, IMUSICSDB, ISOUNDSDB } from '@/store/interfaces'
import { modalShow } from '@/store/actions/modal'
import { AddFavoritesSound } from '@/store/actions/sounds'
import { ChangeStateMusic } from '@/store/actions/music'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
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
import { useLanguage } from '@/hooks'

export const FavoritesTiles = ({ item, use }) => {
  const [{ name, modalMessages }] = useLanguage()
  const currentMix = useSelector<RootState>(
    state => state.favorites.currentMix,
  ) as string
  const dbmusics = useSelector<RootState>(
    state => state.db.musics,
  ) as IMUSICSDB[]
  const dbsounds = useSelector<RootState>(
    state => state.db.musics,
  ) as ISOUNDSDB[]
  const favorites = useSelector<RootState>(
    state => state.favorites.favorites,
  ) as IFavorites[]
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const width = useWindowDimensions().width
  const [playing, setPlaying] = useState(use)

  const music = dbmusics[item.StateMusic.id - 1]
    ? `${JSON.parse(dbmusics[item.StateMusic.id - 1]?.title)[name]}`
    : ''
  const mixedsounds = item.StateSound.mixedSound
    .map(
      (sound: ISOUNDSDB) =>
        ' ' + JSON.parse(dbsounds[Number(sound.id) - 1].title)[name],
    )
    .toString()
  const sounds = mixedsounds ? (music ? `,${mixedsounds}` : mixedsounds) : ''
  const textMessage = music + sounds

  const dispatch = useDispatch()
  const editMix = (id: string) => {
    const modalInfo = Object.assign({ id: id }, modalMessages.editFavoriteMix)
    dispatch(modalShow(modalInfo))
  }

  const removeMix = (id: string) => {
    const modalInfo = Object.assign(
      { id: id, name: item.name },
      modalMessages.removeFavoriteMix,
      {
        message: `${modalMessages.removeFavoriteMix.message} "${item.name}"?`,
      },
    )
    dispatch(modalShow(modalInfo))
  }

  const PlayFavorite = (id: number) => {
    favorites[id - 1].StateSound
      ? dispatch(AddFavoritesSound(favorites[id - 1].StateSound))
      : null
    favorites[id - 1].StateMusic
      ? dispatch(ChangeStateMusic(favorites[id - 1].StateMusic))
      : null
    dispatch(
      ChangeCurrentMixPlay({
        name: favorites[id - 1].name,
        id: favorites[id - 1].id,
      }),
    )
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
            borderColor: playing
              ? theme.borderColorRGBA2
              : theme.borderColorRGBA,
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
            <EditSVG width="55%" height="55%" fill={theme.ITEM_COLOR} />
          </Touchable>
          <Touchable
            style={styles.touchClose}
            onPress={() => removeMix(item.id)}>
            <CloseItemSVG width="55%" height="55%" fill={theme.ITEM_COLOR} />
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
