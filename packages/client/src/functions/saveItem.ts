import { saveData, uploadFile } from '../api/dataAPI'
import { addUser } from '../api/userAPI'
import {
  IActiveObj,
  IMUSICCategories,
  IMUSICS,
  INOTIFICATIONS,
  ISOUNDCategories,
  ISOUNDS,
} from 'store/Data/interfaces'
import { DataStore, ModalStore } from 'store'
import { appData } from 'data/app'
import { api } from 'api/api'
import { MODAL } from 'data/modal'
import { IPrepareDataSave } from './interfaces'
import { errorHandler } from 'utils/errorHandler'
import { stableSort } from 'utils/stableSort'
import { AxiosError } from 'axios'

export const saveItem = async (
  request: string,
  object: IActiveObj,
  data: DataStore,
  modal: ModalStore,
) => {
  const CheckID = (
    db:
      | ISOUNDS[]
      | IMUSICS[]
      | ISOUNDCategories[]
      | IMUSICCategories[]
      | INOTIFICATIONS[],
  ) => {
    const dbMap = db.map(value => Number(value.id))
    const dbSort = dbMap.slice().sort((a, b) => {
      return a > b ? 1 : a === b ? 0 : -1
    })
    const indexIDmap = dbMap.slice()
    const indexID =
      stableSort(indexIDmap, () => 0).findIndex(
        (value, index) => +value + 1 !== +dbSort[index + 1],
      ) + 1
    return indexID < db.length ? indexID.toString() : db.length.toString()
  }

  const prepareDataRecord = (request: string) => {
    switch (request) {
      case appData.globalCategory.DATA_SOUNDS:
        return {
          api: api.ADD_SOUND,
          object: {
            ...object,
            id: CheckID(data.Sounds),
          },
          addData: function (newObject: ISOUNDS) {
            return data.addSound(newObject)
          },
          uploadImage: async function (img: File) {
            return await uploadFile(api.UPLOAD_FILE, img, {
              type: 'img',
              category: 'Sounds',
              directory: this.object.category.ENG,
            })
          },
          uploadSound: function (snd: File) {
            return uploadFile(api.UPLOAD_FILE, snd, {
              type: 'sounds',
              category: 'Sounds',
              directory: this.object.category.ENG,
            })
          },
        }
      case appData.globalCategory.DATA_MUSICS:
        return {
          api: api.ADD_MUSIC,
          object: {
            ...object,
            id: CheckID(data.Musics),
          },
          addData: function (newObject: IMUSICS) {
            return data.addMusic(newObject)
          },
          uploadImage: async function (img: File) {
            return await uploadFile(api.UPLOAD_FILE, img, {
              type: 'img',
              category: 'Musics',
              directory: this.object.category.ENG,
            })
          },
          uploadSound: function (snd: File) {
            return uploadFile(api.UPLOAD_FILE, snd, {
              type: 'sounds',
              category: 'Music',
              directory: this.object.category.ENG,
            })
          },
        }
      case appData.globalCategory.SOUNDS_Categories:
        return {
          api: api.ADD_SOUNDCATEGORY,
          object: {
            ...object,
            id: CheckID(data.SoundCategories),
          },
          addData: function (newObject: ISOUNDCategories) {
            return data.addSoundCategory(newObject)
          },
          uploadImage: async function (img: File) {
            return await uploadFile(api.UPLOAD_FILE, img, {
              type: 'img',
              category: 'Categories',
              directory: 'Sounds',
            })
          },
        }
      case appData.globalCategory.MUSICS_Categories:
        return {
          api: api.ADD_MUSICCATEGORY,
          object: {
            ...object,
            id: CheckID(data.MusicCategories),
          },
          addData: function (newObject: IMUSICCategories) {
            return data.addMusicCategory(newObject)
          },
          uploadImage: async function (img: File) {
            return await uploadFile(api.UPLOAD_FILE, img, {
              type: 'img',
              category: 'Categories',
              directory: 'Musics',
            })
          },
        }
      case appData.globalCategory.NOTIFICATIONS:
        return {
          api: api.ADD_NOTIFICATION,
          object: {
            ...object,
            id: CheckID(data.Notifications),
          },
          addData: function (newObject: INOTIFICATIONS) {
            return data.addNotification(newObject)
          },
        }
      default:
        break
    }
  }

  data.setShowLoading(true)
  try {
    const prepareData = prepareDataRecord(request) as IPrepareDataSave
    if (prepareData?.uploadImage) {
      prepareData.uploadImage(data.File.imgStorage.info)
    }
    const isSound =
      request === appData.globalCategory.DATA_SOUNDS ||
      request === appData.globalCategory.DATA_MUSICS
        ? true
        : false
    if (isSound && prepareData?.uploadSound) {
      await prepareData.uploadSound(data.File.storage.info)
    }
    if (!isSound && prepareData?.uploadImage) {
      prepareData.uploadImage(data.File.imgStorage_lt.info)
    }
    const response =
      request !== appData.globalCategory.USERS
        ? await saveData(prepareData.api, prepareData.object)
        : await addUser(object as any)
    data.setShowLoading(false)
    modal.setShowModal(MODAL.modalMessageTitle.attention, response.message.RUS)
    if (request === appData.globalCategory.USERS) {
      data.addUser(response.resultUser)
      data.setActiveObj(response.resultUser)
      data.setNewBarIndex(response.resultUser.personalData.username)
      return
    }
    prepareData.addData(response.object)
    data.setActiveObj(response.object)
    data.setNewBarIndex(response.object._id)
    if (prepareData.object.push) {
      modal.setShowQuestionModal({
        title: MODAL.modalMessageTitle.attention,
        description: `${MODAL.modalMessages.sendNotification} "${data.CurrentObj.title?.RUS}"?`,
        type: MODAL.modalType.sendNotification,
        request: data.CurrentObj.globalCategory,
      })
    }
  } catch (err) {
    const error = errorHandler(err as AxiosError) as string
    data.setShowLoading(false)
    modal.setShowModal(MODAL.modalMessageTitle.error, error)
  }
}
