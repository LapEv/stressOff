import { ILocalizationOptions } from '@/localization/interfaces'
import store from '@/store'
import { RemoveFavoritesMixes } from '@/store/actions/favorites'
import { showModal } from '@/store/actions/modal'
import { ChangeStateMusic } from '@/store/actions/music'
import { ClearSound } from '@/store/actions/sounds'
import { IFavorites } from '@/store/interfaces'

export const RemoveFavoritesMix = (id: number) => {
  const currentId = (store.getState().favorites as IFavorites).currentId
  const _emptyMixName = (store.getState().language as ILocalizationOptions)
    .Messages.currentMix
  store.dispatch(
    RemoveFavoritesMixes({
      id: id,
      emptyMixName: _emptyMixName,
    }),
  )
  store.dispatch(showModal({ show: false }))
  currentId === id
    ? (store.dispatch(ClearSound(null)),
      store.dispatch(
        ChangeStateMusic({
          id: 0,
          playing: false,
          use: false,
          startApp: false,
        }),
      ))
    : null
}
