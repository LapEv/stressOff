import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IDBState, IUser } from '@/store/interfaces'
import { UpdateMusicsStatusDB, UpdateSoundsStatusDB } from '@/store/actions/db'
import { DBActions } from './dbActions'
import { addUnsentData, updateDataMusic, updateDataSound } from '@/db'
import { updateStatusMusic, updateStatusSound } from '@/api/dataAPI'

export function useDB(): [IDBState, DBActions] {
  const db = useSelector<RootState>(state => state.db) as IDBState
  const user = useSelector<RootState>(state => state.user) as IUser
  const isConnected = useSelector<RootState>(
    state => state.connect.isConnected,
  ) as boolean
  const dispatch = useDispatch()

  return [
    db,
    {
      async UpdateSoundsStatusDB({ _id, newSound }) {
        dispatch(UpdateSoundsStatusDB({ _id, newSound }))
        await updateDataSound('newSound', newSound, '_id', _id)
        const data = { _id, newSound, userID: user._id }
        isConnected
          ? updateStatusSound(data)
          : await addUnsentData({ type: 'updateStatusNewSound', data })
      },
      async UpdateMusicsStatusDB({ _id, newSound }) {
        dispatch(UpdateMusicsStatusDB({ _id, newSound }))
        await updateDataMusic('newSound', newSound, '_id', _id)
        const data = { _id, newSound, userID: user._id }
        isConnected
          ? updateStatusMusic(data)
          : await addUnsentData({ type: 'updateStatusNewMusic', data })
      },
    },
  ]
}
