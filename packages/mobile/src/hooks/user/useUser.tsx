import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IUser } from '@/store/interfaces'
import { userActions } from './userActions'

export function useUser(): [IUser, userActions] {
  const user = useSelector<RootState>(state => state.user) as IUser
  // const dispatch = useDispatch()

  return [
    user,
    {
      UpdateUser() {
        console.log('UpdateUser')
      },
    },
  ]
}
