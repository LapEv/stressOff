import { IModalMessage } from '@/store/interfaces'

export interface modalMeessageActions {
  showModalMessage: (data: IModalMessage) => void
}
