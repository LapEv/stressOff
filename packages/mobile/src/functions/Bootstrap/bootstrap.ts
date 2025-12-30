import { AxiosError } from 'axios'
import { getData } from 'api/dataAPI'
import { api } from 'api/api'
import store from 'store'
import * as Font from 'expo-font'
import {
  LoadMusicCategoriesFromFB,
  LoadMusicFromFB,
  LoadNotificationsFromFB,
  LoadSoundCategoriesFromFB,
  LoadSoundFromFB,
} from '@/store/actions/db'
import { errorHandler } from 'utils/errorHandler'
import { check, findUserData } from 'api/userAPI'
import { Storage } from 'expo-sqlite/kv-store'
import { addUserData } from '@/store/actions/user'
import { ChangeLanguage } from '@/store/actions/language'
import { ChangeTheme } from '@/store/actions/theme'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { dataApp } from '@/data/dataApp'
import { AddFavoritesSound } from '@/store/actions/sounds'
import { ChangeStateMusic } from '@/store/actions/music'
import { IBootstrap, ICurrentPlay } from '../interfaces'
import { IntervalFeedback } from '@/store/actions/intervalFeedback'
import { getPesonalData } from '@/db/personalData'
import { createDataFromCloud } from './createDataFromCloud'
import {
  getAppData,
  getDataSounds,
  getMUSICS_Categories,
  getNotifications,
  getSOUNDS_Categories,
} from '@/db'
import {
  IAppData_,
  IMUSICCategories,
  IMUSICS,
  INOTIFICATIONS,
  ISOUNDCategories,
  ISOUNDS,
  IUser,
} from '@/store/interfaces'
import { addAppData } from '@/store/actions/appData'
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// })

export const bootstrap = async ({ isConnected, token, user }: IBootstrap) => {
  try {
    // const _handleNotification = (notification: any) => {
    //   console.log('notification = ', notification)
    //   // setNotification({ notification: notification });
    // }
    // const _handleNotificationResponse = (response: any) => {
    //   console.log('notification response = ', response)
    // }
    // const pushToken = await registerForPushNotificationsAsync()
    // console.log('pushToken = ', pushToken)
    // Notifications.addNotificationReceivedListener(_handleNotification)
    // Notifications.addNotificationResponseReceivedListener(
    //   _handleNotificationResponse,
    // )

    if (!isConnected && !token) {
      return {
        status: true,
        newError: 'No Connected, no token',
      }
    }

    const personal = (await getPesonalData()) as IUser[]
    const appData = (await getAppData()) as IAppData_[]
    let createData = false
    if (token && !personal) {
      const userToken = !user && isConnected ? await check() : null
      const _id = userToken?.user._id ?? (user?.id as string)
      const userData = await findUserData(_id)
      const result = await createDataFromCloud(userData)
      if (!result) {
        return {
          status: false,
          newError: 'Error create SQL Data!',
        }
      }
      createData = true
    }

    if (!createData) {
      store.dispatch(addUserData(personal[0]))
      const soundCategoriesDB =
        (await getSOUNDS_Categories()) as ISOUNDCategories[]
      const musicCategoriesDB =
        (await getMUSICS_Categories()) as IMUSICCategories[]
      store.dispatch(LoadSoundCategoriesFromFB(soundCategoriesDB))
      store.dispatch(LoadMusicCategoriesFromFB(musicCategoriesDB))
      const soundDB = (await getDataSounds()) as ISOUNDS[]
      const musicDB = (await getData(api.GET_DATA_MUSICS)) as IMUSICS[]
      store.dispatch(LoadSoundFromFB(soundDB))
      store.dispatch(LoadMusicFromFB(musicDB))
      const notifications = (await getNotifications()) as INOTIFICATIONS[]
      store.dispatch(LoadNotificationsFromFB(notifications))
      store.dispatch(addAppData(appData[0]))
    }

    store.dispatch(ChangeLanguage(appData[0].language))
    store.dispatch(ChangeTheme(appData[0].theme))

    // добавить favorite Play в облако и SQLite
    // if (favoritesPlay.length > 0) {
    //   store.dispatch(LoadFavoritesMixes(favoritesPlay))
    // }

    const currentPlay = JSON.parse(
      Storage.getItemSync(dataApp.STORAGE_KEYS.currentPlay) as string,
    ) as ICurrentPlay

    if (currentPlay) {
      currentPlay.sound.playAll = false
      currentPlay.sound.startApp = true
      currentPlay.music.startApp = true
      currentPlay.sound
        ? store.dispatch(AddFavoritesSound(currentPlay.sound))
        : null
      currentPlay.music
        ? store.dispatch(ChangeStateMusic(currentPlay.music))
        : null
      currentPlay.favorites
        ? store.dispatch(
            ChangeCurrentMixPlay({
              name: currentPlay.favorites.currentMix,
              id: currentPlay.favorites.id,
            }),
          )
        : null
    }

    await Font.loadAsync({
      'open-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
    })

    const dateFeedback = JSON.parse(
      Storage.getItemSync(dataApp.STORAGE_KEYS.feedbackInterval) as string,
    )

    dateFeedback ? store.dispatch(IntervalFeedback(dateFeedback)) : null
    // await AsyncStorage.removeItem(CONST.STORAGE_KEYS.favoritesPlay);
    return {
      status: true,
      newError: '',
    }
  } catch (err) {
    console.log('err = ', err)
    const error = errorHandler(err as AxiosError)
    const language = 'RUS'
    return {
      status: false,
      newError:
        error instanceof Object
          ? error.message[language as keyof typeof error.message]
          : error,
    }
  }
}
