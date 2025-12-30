import { IModalMessage } from '../interfaces'
import { MODAL_SHOW_MESSAGE } from '../types'

export const modalShowMessage = (modalInfo: IModalMessage) => {
  return {
    type: MODAL_SHOW_MESSAGE,
    payload: modalInfo,
  }
}
