import { appData } from 'data/app'
import { deleteData } from '../api/dataAPI'
import { api } from 'api/api'
import {
  emptyActiveObj,
  emptyCategoryMusic,
  emptyCategorySound,
  emptyMusic,
  emptySound,
} from 'store/data'
import { MODAL } from 'data/modal'
import { DataStore, ModalStore } from 'store'
import { IActiveObj } from 'store/Data/interfaces'
import { errorHandler } from 'utils/errorHandler'
import { IPrepareDataDelete } from './interfaces'
import { AxiosError } from 'axios'

export const deleteItem = async (
  request: string,
  object: IActiveObj,
  data: DataStore,
  modal: ModalStore,
) => {
  const prepareDataDelete = (request: string, id: string) => {
    switch (request) {
      case appData.globalCategory.DATA_SOUNDS:
        return {
          api: api.DELETE_SOUND,
          emptyObject: emptySound,
          deleteData: function () {
            return data.deleteSound(id)
          },
        }
      case appData.globalCategory.DATA_MUSICS:
        return {
          api: api.DELETE_MUSIC,
          emptyObject: emptyMusic,
          deleteData: function () {
            return data.deleteMusic(id)
          },
        }

      case appData.globalCategory.SOUNDS_Categories:
        return {
          api: api.DELETE_SOUNDCATEGORY,
          emptyObject: emptyCategorySound,
          deleteData: function () {
            return data.deleteSoundCategory(id)
          },
        }
      case appData.globalCategory.MUSICS_Categories:
        return {
          api: api.DELETE_MUSICCATEGORY,
          emptyObject: emptyCategoryMusic,
          deleteData: function () {
            return data.deleteMusicCategory(id)
          },
        }
      case appData.globalCategory.NOTIFICATIONS:
        return {
          api: '',
          emptyObject: emptyActiveObj,
          deleteData: function () {
            return emptyActiveObj
          },
        }

      default:
        break
    }
  }

  const { id } = object
  if (!id) return
  data.setShowLoading(true)
  try {
    const prepareData = prepareDataDelete(request, id) as IPrepareDataDelete
    const response = await deleteData(prepareData?.api as string, { id })
    data.setShowLoading(false)
    modal.setShowModal(MODAL.modalMessageTitle.attention, response.message.RUS)
    prepareData.deleteData() as void
    data.setNullIndex(prepareData?.emptyObject._id)
  } catch (err) {
    const error = errorHandler(err as AxiosError) as string
    data.setShowLoading(false)
    modal.setShowModal(MODAL.modalMessageTitle.error, error)
  }
}
