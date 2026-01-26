import store from '@/store'
import { CheckForFavoritesName } from './checkForFavoritesName'
import { ILocalizationOptions } from '@/localization/interfaces'
import { showModalMessage } from '@/store/actions/modalMessage'
import { dispatchEditFavoritesMix } from './dispatchEditMix'

export const EditFavoriteMix = (id: number, name: string) => {
  const language = store.getState().language as ILocalizationOptions
  const result = CheckForFavoritesName(name)
  !result
    ? name.length
      ? dispatchEditFavoritesMix(id, name)
      : store.dispatch(showModalMessage(language.modalMessages.emptyName))
    : store.dispatch(showModalMessage(language.modalMessages.sameNameFound))
}
