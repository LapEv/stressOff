import { IModal } from '../interfaces'
import { MODAL_SHOW } from '../types'

export const modalShow = (modalInfo: IModal | string) => {
  return {
    type: MODAL_SHOW,
    payload: modalInfo,
  }
}
