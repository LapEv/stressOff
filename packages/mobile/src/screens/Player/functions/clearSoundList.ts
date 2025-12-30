import store from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { ClearSound } from '@/store/actions/sounds'
import { ChangeStateMusic } from '@/store/actions/music'
import { modalShow } from '@/store/actions/modal'

export const ClearSoundList = () => {
  const language = store.getState().language as ILocalizationOptions
  ;(store.dispatch(
    ChangeCurrentMixPlay({
      name: language.Messages.currentMix,
      id: 0,
    }),
  ),
    store.dispatch(ClearSound(null)),
    store.dispatch(
      ChangeStateMusic({
        id: 0,
        playing: false,
        use: false,
        startApp: false,
      }),
    ),
    store.dispatch(modalShow({ show: false })))
}
