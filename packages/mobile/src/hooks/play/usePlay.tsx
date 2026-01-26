import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IPlayState } from '@/store/interfaces'
import { IPlayActions } from './playActions'
import { AddSound, ToggleAllSound, RemoveSound } from '@/store/actions/play'

export function usePlay(): [IPlayState, IPlayActions] {
  const play = useSelector<RootState>(state => state.play) as IPlayState
  const dispatch = useDispatch()

  return [
    play,
    {
      ToggleAllSound(data) {
        dispatch(ToggleAllSound(data))
      },
      AddSound(data) {
        dispatch(AddSound(data))
      },
      RemoveSound(data) {
        dispatch(RemoveSound(data))
      },
    },
  ]
}
