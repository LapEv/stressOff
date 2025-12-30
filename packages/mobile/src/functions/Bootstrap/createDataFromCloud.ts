import { api } from '@/api/api'
import { getData } from '@/api/dataAPI'
import {
  createAppData,
  createDataMusics,
  createDataSounds,
  createMUSICS_Categories,
  createNotification,
  createPersonalData,
  createSOUNDS_Categories,
} from '@/db'
import store from '@/store'
import { addAppData } from '@/store/actions/appData'
import {
  LoadMusicCategoriesFromFB,
  LoadMusicFromFB,
  LoadNotificationsFromFB,
  LoadSoundCategoriesFromFB,
  LoadSoundFromFB,
} from '@/store/actions/db'
import { addUserData } from '@/store/actions/user'
import {
  IMUSICCategories,
  IMUSICS,
  ISOUNDCategories,
  ISOUNDS,
  IUserData,
} from '@/store/interfaces'

export const createDataFromCloud = async (userData: IUserData) => {
  try {
    const { username, email, name, type, roles, createdAt } =
      userData.personalData
    const _id = userData._id
    await createPersonalData({
      _id,
      username,
      email,
      name,
      type,
      roles,
      createdAt,
    })
    store.dispatch(addUserData(userData.personalData))

    const soundCategoriesDB = (await getData(
      api.GET_DATA_SOUNDCATEGORIES,
    )) as ISOUNDCategories[]
    const musicCategoriesDB = (await getData(
      api.GET_DATA_MUSICCATEGORIES,
    )) as IMUSICCategories[]
    await createSOUNDS_Categories(soundCategoriesDB)
    store.dispatch(LoadSoundCategoriesFromFB(soundCategoriesDB))
    await createMUSICS_Categories(musicCategoriesDB)
    store.dispatch(LoadMusicCategoriesFromFB(musicCategoriesDB))

    const soundDB = (await getData(api.GET_DATA_SOUNDS)) as ISOUNDS[]
    const musicDB = (await getData(api.GET_DATA_MUSICS)) as IMUSICS[]

    await createDataSounds(soundDB)
    store.dispatch(LoadSoundFromFB(soundDB))
    await createDataMusics(musicDB)
    store.dispatch(LoadMusicFromFB(musicDB))

    await createNotification(userData.Notification[0])
    store.dispatch(LoadNotificationsFromFB(userData.Notification))

    await createAppData(userData.appData)
    store.dispatch(addAppData(userData.appData))

    return true
  } catch (e) {
    console.log('e = ', e)
    return false
  }
}
