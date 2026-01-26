import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { tokenActions } from './tokenActions'
import { addToken } from '@/store/actions/token'

export function useToken(): [string, tokenActions] {
  const token = useSelector<RootState>(state => state.token) as string
  const dispatch = useDispatch()

  return [
    token,
    {
      addToken(token: string | null) {
        dispatch(addToken(token))
      },
    },
  ]
}
