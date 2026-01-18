import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { IModalMessage } from '@/store/interfaces'
import { modalMeessageActions } from './modalMeessageActions'
import { showModalMessage } from '@/store/actions/modalMessage'

export function useModalMeessage(): [IModalMessage, modalMeessageActions] {
  const modalMessage = useSelector<RootState>(
    state => state.modalMessage,
  ) as IModalMessage
  const dispatch = useDispatch()

  return [
    modalMessage,
    {
      showModalMessage(data: IModalMessage) {
        dispatch(showModalMessage(data))
      },
    },
  ]
}
