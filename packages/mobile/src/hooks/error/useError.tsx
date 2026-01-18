import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IError } from '@/store/interfaces'
import { errorActions } from './errorActions'
import { addError } from '@/store/actions/error'
import { useDispatch } from 'react-redux'

export function useError(): [IError, errorActions] {
  const error = useSelector<RootState>(state => state.error) as IError
  const dispatch = useDispatch()

  return [
    error,
    {
      addError({ status, message }: IError) {
        dispatch(addError({ status, message }))
      },
      clearError() {
        dispatch(addError({ status: 0, message: '' }))
      },
    },
  ]
}
