import { IModal } from '../interfaces'
import { MODAL_SHOW } from '../types'

export const showModal = (modalInfo: IModal | string) => {
  return {
    type: MODAL_SHOW,
    payload: modalInfo,
  }
}
