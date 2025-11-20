import { updateData } from '../api/dataAPI'
import { errorHandler } from 'utils/errorHandler'
import {
  IActiveObj,
  IMESSAGES,
  IMUSICCategories,
  IMUSICS,
  INOTIFICATIONS,
  IREQUESTS,
  ISOUNDCategories,
  ISOUNDS,
  IUSERS,
  ICurrentObj,
  ICurrentCategoryObj,
  IData,
} from 'store/Data/interfaces'
import { DataStore, ModalStore } from 'store'
import { IPrepareDatUpdate } from './interfaces'
import { appData } from 'data/app'
import { MODAL } from 'data/modal'
import { api } from 'api/api'
import { AxiosError } from 'axios'

export const updateItem = async (
  request: string,
  object:
    | ISOUNDS
    | IMUSICS
    | ISOUNDCategories
    | IMUSICCategories
    | INOTIFICATIONS
    | IREQUESTS
    | IUSERS
    | IMESSAGES
    | IActiveObj
    | ICurrentObj
    | ICurrentCategoryObj,
  data: DataStore,
  modal: ModalStore,
) => {
  const prepareDataRecord = (request: string) => {
    switch (request) {
      case appData.globalCategory.DATA_SOUNDS:
        return {
          api: api.UPDATE_SOUND,
          updateData: function () {
            return data.updateSound(object as ISOUNDS)
          },
        }
      case appData.globalCategory.DATA_MUSICS:
        return {
          api: api.UPDATE_MUSIC,
          updateData: function () {
            return data.updateMusic(object as IMUSICS)
          },
        }
      case appData.globalCategory.SOUNDS_Categories:
        return {
          api: api.UPDATE_SOUNDCATEGORY,
          updateData: function () {
            return data.updateSoundCategory(object as ISOUNDCategories)
          },
        }
      case appData.globalCategory.MUSICS_Categories:
        return {
          api: api.UPDATE_MUSICCATEGORY,
          updateData: function () {
            return data.updateMusicCategory(object as IMUSICCategories)
          },
        }
      case appData.globalCategory.NOTIFICATIONS:
        return {
          api: api.UPDATE_NOTIFICATION,
          updateData: function () {
            return data.updateNotification(object as INOTIFICATIONS)
          },
        }
      case appData.globalCategory.REQUESTS:
        return {
          api: api.UPDATE_REQUEST,
          updateData: function () {
            return data.updateRequest(object as IREQUESTS)
          },
        }
      case appData.globalCategory.USERS:
        return {
          api: api.UPDATE_USER,
          updateData: function () {
            return data.updateUser(object as IUSERS)
          },
        }
      case appData.updateUnreadInMessage:
        return {
          api: api.UPDATE_UNREAD_IN_MESSAGE,
          updateData: function () {
            return data.updateMessages(object as IMESSAGES)
          },
        }

      case appData.updateUnreadInRequest:
        return {
          api: api.UPDATE_UNREAD_IN_REQUEST,
          updateData: function () {
            return data.updateRequest(object as IREQUESTS)
          },
        }
      default:
        break
    }
  }

  data.setShowLoading(true)
  try {
    const prepareData = prepareDataRecord(request) as IPrepareDatUpdate
    const response = await updateData(prepareData.api, object)

    prepareData.updateData()
    data.setActiveObj(object as IActiveObj)
    data.setShowLoading(false)
    if (
      request === appData.updateUnreadInRequest ||
      request === appData.updateUnreadInMessage
    )
      return
    modal.setShowModal(MODAL.modalMessageTitle.attention, response.message.RUS)
    if ((object as INOTIFICATIONS).push) {
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
