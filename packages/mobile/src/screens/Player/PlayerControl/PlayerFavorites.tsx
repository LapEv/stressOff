import { Shadow, Touchable, ViewStyle } from '@/components'
import { ImageBackground, StyleSheet } from 'react-native'
import { IPlayerFavorites, ISoundsItems } from '../interfaces'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { HeartSVG, HeartSVGYes } from '@/assets/icons/SVG'
import { useEffect } from 'react'
import { dataApp } from '@/data/dataApp'
import {
  IFavorites,
  IFavoritesContent,
  IMusicState,
  ISoundState,
} from '@/store/interfaces'
import { CheckForFavoriteContent } from '../../Favorites/functions/checkForFavoriteContent'
import { useDispatch } from 'react-redux'
import { modalShow } from '@/store/actions/modal'
import * as SecureStore from 'expo-secure-store'
import { useLanguage, useModalMeessage, useTheme } from '@/hooks'

export const PlayerFavorites = ({
  disabledControl,
  navigation,
  favorite,
  setFavorite,
}: IPlayerFavorites) => {
  const [{ modalMessages }] = useLanguage()
  const [{ ITEM_COLOR, CHECK_COLOR, toFavoritesScreen }] = useTheme()
  const [, { showModalMessage }] = useModalMeessage()
  const StateMusic = useSelector<RootState>(state => state.music) as IMusicState
  const StateSound = useSelector<RootState>(state => state.music) as ISoundState
  const favorites = useSelector<RootState>(
    state => state.favorites,
  ) as IFavorites
  const playingMusicId = useSelector<RootState>(
    state => state.music.id,
  ) as number
  const playingDataSound = useSelector<RootState>(
    state => state.sound.mixedSound,
  ) as ISoundsItems[]

  const dispatch = useDispatch()

  const AddFavoriteMix = () => {
    const result = CheckForFavoriteContent()
    !result
      ? dispatch(
          modalShow({
            ...modalMessages.addFavoriteMix,
            ...{
              category: 'mixes',
            },
          }),
        )
      : ((modalMessages.sameMixFound.message = `${
          modalMessages.sameMixFound.message1
        } "${result.trim()}"`),
        showModalMessage(modalMessages.sameMixFound),
        setFavorite(true))
  }

  const CheckAddFavoritesFunction = () => {
    if (disabledControl) {
      navigation.navigate('SectionsTabNavigation', {
        screen: 'FavouritesTavNavigation',
      })
      return
    }
    if (
      (playingMusicId > 0 && playingDataSound.length >= 1) ||
      playingDataSound.length > 1
    ) {
      !favorite
        ? AddFavoriteMix()
        : navigation.navigate('SectionsTabNavigation', {
            screen: 'FavouritesTavNavigation',
          })
    } else {
      navigation.navigate('SectionsTabNavigation', {
        screen: 'FavouritesTavNavigation',
      })
    }
  }

  const setAsyncStorageCurrentPlay = () => {
    const value = {
      sound: StateSound,
      music: StateMusic,
      favorites: {
        currentMix: favorites.currentMix,
        currentId: favorites.currentId,
      },
    }
    try {
      return SecureStore.setItemAsync(
        dataApp.STORAGE_KEYS.currentPlay,
        JSON.stringify(value),
      )
    } catch (e) {
      console.log('SettingsItems: Error: ', e)
    }
  }

  const setAsyncStorageFavoritePlay = async (
    favoritesValue: IFavoritesContent[],
  ) => {
    console.log('favoritesValue = ', favoritesValue)
    // await updateFavoritesDB(favoritesValue, user._id)
  }

  useEffect(() => {
    const result = CheckForFavoriteContent()
    setFavorite(result ? true : false)
    setAsyncStorageCurrentPlay()
  }, [favorites])

  useEffect(() => {
    setAsyncStorageFavoritePlay(favorites.favorites)
  }, [favorites.favorites])

  return (
    <Shadow style={styles.shadowFavorites}>
      <Touchable
        style={styles.touchFavorites}
        // disabled={disabledControl}
        activeOpacity={favorite ? 1 : 0.2}
        onPress={() => CheckAddFavoritesFunction()}>
        {disabledControl ? (
          <ViewStyle style={styles.viewFavorites}>
            <ImageBackground
              source={toFavoritesScreen}
              resizeMode={'contain'}
              imageStyle={styles.imgStyleContainer}
              style={styles.imgStyle}
            />
          </ViewStyle>
        ) : (playingMusicId > 0 && playingDataSound.length >= 1) ||
          playingDataSound.length > 1 ? (
          !favorite ? (
            <ViewStyle style={styles.viewSVG}>
              <HeartSVG width="100%" height="100%" fill={ITEM_COLOR} />
            </ViewStyle>
          ) : (
            <ViewStyle style={styles.viewSVG}>
              <HeartSVGYes width="100%" height="100%" fill={CHECK_COLOR} />
            </ViewStyle>
          )
        ) : (
          <ViewStyle style={styles.view}>
            <ImageBackground
              source={toFavoritesScreen}
              resizeMode={'contain'}
              style={styles.imgStyle}
            />
          </ViewStyle>
        )}
      </Touchable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  shadowFavorites: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  touchFavorites: {
    width: 65,
    height: 65,
    borderRadius: 50,
    paddingTop: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFavorites: {
    width: '70%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
  viewSVG: {
    width: 50,
    height: 50,
  },
  view: {
    width: '70%',
    height: '70%',
  },
})
