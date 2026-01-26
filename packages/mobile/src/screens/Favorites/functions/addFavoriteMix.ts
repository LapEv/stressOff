import { ILocalizationOptions } from '@/localization/interfaces'
import store from '@/store'
import { showModalMessage } from '@/store/actions/modalMessage'
import { dispatchAddFavoritesMix } from './dispatchAddMix'
import { CheckForFavoritesName } from './checkForFavoritesName'

export const AddFavoriteMix = (id: number, name: string, category: string) => {
  const language = store.getState().language as ILocalizationOptions
  const result = CheckForFavoritesName(name)
  !result
    ? name.length
      ? dispatchAddFavoritesMix(id, name, category)
      : store.dispatch(showModalMessage(language.modalMessages.emptyName))
    : store.dispatch(showModalMessage(language.modalMessages.sameNameFound))
}
