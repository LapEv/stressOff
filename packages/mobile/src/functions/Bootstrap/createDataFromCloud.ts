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
  getAppData,
  getDataMusics,
  getDataSounds,
  getMUSICS_Categories,
  getNotifications,
  getSOUNDS_Categories,
} from '@/db'
import store from '@/store'
import { addAppData } from '@/store/actions/appData'
import {
  LoadMusicCategories,
  LoadMusic,
  LoadNotificationsFromFB,
  LoadSoundCategories,
  LoadSound,
} from '@/store/actions/db'
import { addUserData } from '@/store/actions/user'
import {
  IAppData_,
  ICategories,
  ICategoriesFB,
  INOTIFICATIONS,
  ISOUNDS,
  ISOUNDSFB,
  IUserDataFB,
} from '@/store/interfaces'
import { downLoadImages, downLoadSounds } from '../Files/downloadFiles'

export const createDataFromCloud = async (userData: IUserDataFB) => {
  try {
    const { personalData } = userData
    const personalData_ = { ...personalData, _id: userData._id }
    await createPersonalData(personalData_)
    store.dispatch(addUserData(userData.personalData))

    const soundCategoriesFB = (await getData(
      api.GET_DATA_SOUNDCATEGORIES,
    )) as ICategoriesFB[]
    const soundCategoriesFB_ = soundCategoriesFB.map((item, index) => {
      return { ...item, _id: userData.SOUNDS_Categories[index]._id }
    }) as ICategoriesFB[]
    await createSOUNDS_Categories(soundCategoriesFB_)
    const sound_categories = (await getSOUNDS_Categories()) as ICategories[]
    store.dispatch(LoadSoundCategories(sound_categories))

    const musicCategoriesFB = (await getData(
      api.GET_DATA_MUSICCATEGORIES,
    )) as ICategoriesFB[]
    const musicCategoriesFB_ = musicCategoriesFB.map((item, index) => {
      return { ...item, _id: userData.MUSICS_Categories[index]._id }
    }) as ICategoriesFB[]
    await createMUSICS_Categories(musicCategoriesFB_)
    const music_categories = (await getMUSICS_Categories()) as ICategories[]
    store.dispatch(LoadMusicCategories(music_categories))

    const soundsFB = (await getData(api.GET_DATA_SOUNDS)) as ISOUNDSFB[]
    const soundsFB_ = await Promise.all(
      soundsFB.map(async (item, index) => {
        const { _id, payment, booked, newSound, location } =
          userData.DATA_SOUNDS[index]
        const img = (await downLoadImages({
          type: 'Sounds',
          category: item.category.ENG,
          storage: item.imgStorage,
        })) as string
        const sound = (await downLoadSounds({
          type: 'Sounds',
          category: item.category.ENG,
          storage: item.storage,
        })) as string
        return { ...item, _id, payment, booked, newSound, location, img, sound }
      }),
    )
    console.log('soundsFB_ = ', soundsFB_)
    soundsFB_.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
    await createDataSounds(soundsFB_)
    const soundDB = (await getDataSounds()) as ISOUNDS[]
    store.dispatch(LoadSound(soundDB))

    const musicsFB = (await getData(api.GET_DATA_MUSICS)) as ISOUNDSFB[]
    const musicsFB_ = (await Promise.all(
      musicsFB.map(async (item, index) => {
        const { _id, payment, booked, newSound, location } =
          userData.DATA_MUSICS[index]
        const img = (await downLoadImages({
          type: 'Musics',
          category: item.category.ENG,
          storage: item.imgStorage,
        })) as string
        const sound = (await downLoadSounds({
          type: 'Musics',
          category: item.category.ENG,
          storage: item.storage,
        })) as string
        return { ...item, _id, payment, booked, newSound, location, img, sound }
      }),
    )) as ISOUNDSFB[]
    console.log('musicsFB_ = ', musicsFB_)
    musicsFB_.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))

    await createDataMusics(musicsFB_)
    const musicDB = (await getDataMusics()) as ISOUNDS[]
    store.dispatch(LoadMusic(musicDB))

    await createNotification(userData.Notification[0])
    const notifications = (await getNotifications()) as INOTIFICATIONS[]
    store.dispatch(LoadNotificationsFromFB(notifications))

    await createAppData(userData.appData)
    const appData = (await getAppData()) as IAppData_[]
    store.dispatch(addAppData(appData[0]))

    return true
  } catch (e) {
    console.log('e = ', e)
    return false
  }
}
