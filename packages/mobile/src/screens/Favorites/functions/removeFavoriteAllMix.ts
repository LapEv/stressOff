import { ILocalizationOptions } from '@/localization/interfaces'
import store from '@/store'
import { RemoveFavoritesAllMixes } from '@/store/actions/favorites'
import { showModal } from '@/store/actions/modal'
import { ChangeStateMusic } from '@/store/actions/music'
import { ClearSound } from '@/store/actions/sounds'

export const RemoveFavoritesAllMix = (id: number) => {
  const _emptyMixName = (store.getState().language as ILocalizationOptions)
    .Messages.currentMix
  store.dispatch(
    RemoveFavoritesAllMixes({
      id: id,
      emptyMixName: _emptyMixName,
    }),
  )
  store.dispatch(showModal({ show: false }))
  store.dispatch(ClearSound(null))
  store.dispatch(
    ChangeStateMusic({
      id: 0,
      playing: false,
      use: false,
      startApp: false,
    }),
  )
}
