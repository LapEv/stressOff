import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IDBState } from '@/store/interfaces'
import { UpdateMusicsStatusDB, UpdateSoundsStatusDB } from '@/store/actions/db'
import { DBActions } from './dbActions'
import { updateDataSound } from '@/db'

export function useDB(): [IDBState, DBActions] {
  const db = useSelector<RootState>(state => state.db) as IDBState
  const connect = useSelector<RootState>(state => state.connect) as boolean
  const dispatch = useDispatch()

  return [
    db,
    {
      async UpdateSoundsStatusDB({ _id, newSound }) {
        dispatch(UpdateSoundsStatusDB({ _id, newSound }))
        await updateDataSound('newSound', newSound, '_id', _id)
        if (connect) {
          console.log('connect = ', connect)
        }
      },
      UpdateMusicsStatusDB({ _id, newSound }) {
        dispatch(UpdateMusicsStatusDB({ _id, newSound }))
      },
    },
  ]
}
