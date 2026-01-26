import { AxiosError } from 'axios'
import store from 'store'
import * as Font from 'expo-font'
import * as SecureStore from 'expo-secure-store'
import {
  LoadMusicCategories,
  LoadMusic,
  LoadNotificationsFromFB,
  LoadSoundCategories,
  LoadSound,
} from '@/store/actions/db'
import { errorHandler } from 'utils/errorHandler'
import { check, findUserData, login } from 'api/userAPI'
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
  // delAppData,
  // delDataMusics,
  // delDataSounds,
  // delMUSICS_Categories,
  // delNotifications,
  // delSOUNDS_Categories,
  getAppData,
  getDataMusics,
  getDataSounds,
  getMUSICS_Categories,
  getNotifications,
  getSOUNDS_Categories,
  // updateDataSound,
} from '@/db'
import {
  IAppData_,
  ICategories,
  INOTIFICATIONS,
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
    // const _handleNotification = (notification) => {
    //   console.log('notification = ', notification)
    //   // setNotification({ notification: notification });
    // }
    // const _handleNotificationResponse = (response) => {
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
    // await delDataSounds()
    // await delDataMusics()
    // await delSOUNDS_Categories()
    // await delMUSICS_Categories()
    // await delPesonalData()
    // await delAppData()
    // await delNotifications()
    // return {
    //   status: false,
    //   newError: 'Deleted',
    // }

    const personal = (await getPesonalData()) as IUser[]
    const appData = (await getAppData()) as IAppData_[]

    // const update = await updateDataSound(
    //   'newSound',
    //   true,
    //   '_id',
    //   '62fe4f5dd7f506ff8b3161a1',
    // )
    // console.log('update = ', update)
    // const soundDB = (await getDataSounds()) as ISOUNDS[]
    // console.log('soundDB = ', soundDB[0])
    // console.log('soundDB = ', soundDB[1])

    if (!token && personal) {
      if (personal[0].type !== 'isAnonymous') {
        return {
          status: true,
          newError: 'Token expired!',
        }
      }
      const data = await login(
        personal[0].username,
        process.env.EXPO_PUBLIC_ANONYMOUSUSER_PASSWORD,
      )
      token = data.token
    }

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
      if (!personal) (await getPesonalData()) as IUser[]
      store.dispatch(
        addUserData(
          !personal ? ((await getPesonalData()) as IUser[]) : personal[0],
        ),
      )
      const soundCategoriesDB = (await getSOUNDS_Categories()) as ICategories[]
      const musicCategoriesDB = (await getMUSICS_Categories()) as ICategories[]
      store.dispatch(LoadSoundCategories(soundCategoriesDB))
      store.dispatch(LoadMusicCategories(musicCategoriesDB))
      const soundDB = (await getDataSounds()) as ISOUNDS[]
      const musicDB = (await getDataMusics()) as ISOUNDS[]
      store.dispatch(LoadSound(soundDB))
      store.dispatch(LoadMusic(musicDB))
      const notifications = (await getNotifications()) as INOTIFICATIONS[]
      store.dispatch(LoadNotificationsFromFB(notifications))
      store.dispatch(addAppData(appData[0]))
    }

    const _appData = !appData ? ((await getAppData()) as IAppData_[]) : appData
    store.dispatch(ChangeLanguage(_appData[0].language))
    store.dispatch(ChangeTheme(_appData[0].theme))

    // добавить favorite Play в облако и SQLite
    // if (favoritesPlay.length > 0) {
    //   store.dispatch(LoadFavoritesMixes(favoritesPlay))
    // }

    const currentPlay = JSON.parse(
      (await SecureStore.getItemAsync(
        dataApp.STORAGE_KEYS.currentPlay,
      )) as string,
    ) as ICurrentPlay

    if (currentPlay) {
      currentPlay.sound.playAll = false
      currentPlay.startApp = true
      currentPlay.startApp = true
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
              _id: currentPlay.favorites._id,
            }),
          )
        : null
    }

    await Font.loadAsync({
      'open-bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
    })

    const dateFeedback = JSON.parse(
      (await SecureStore.getItemAsync(
        dataApp.STORAGE_KEYS.feedbackInterval,
      )) as string,
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
