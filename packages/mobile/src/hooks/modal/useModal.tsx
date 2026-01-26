import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { IModal } from '@/store/interfaces'
import { modalActions } from './modalActions'
import { showModal } from '@/store/actions/modal'

export function useModal(): [IModal, modalActions] {
  const modal = useSelector<RootState>(state => state.modal) as IModal
  const dispatch = useDispatch()

  return [
    modal,
    {
      showModal(data: IModal) {
        dispatch(showModal(data))
      },
    },
  ]
}
