import store from '@/store'
import { AddFavoritesMixes } from '@/store/actions/favorites'
import { showModal } from '@/store/actions/modal'
import { IMusicState, ISoundState } from '@/store/interfaces'

export const dispatchAddFavoritesMix = (
  id: number,
  name: string,
  category: string,
) => {
  const StateSound = store.getState().sound as ISoundState
  const StateMusic = store.getState().music as IMusicState
  StateSound.playAll = true
  store.dispatch(
    AddFavoritesMixes({
      id: id,
      name: name,
      StateSound,
      StateMusic,
      category: category,
    }),
  )
  store.dispatch(showModal({ show: false }))
}
