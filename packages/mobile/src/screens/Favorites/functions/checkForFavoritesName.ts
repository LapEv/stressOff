import store from '@/store'
import { IFavorites } from '@/store/interfaces'

export const CheckForFavoritesName = (name: string) => {
  const favorites = (store.getState().favorites as IFavorites).favorites
  const findName = favorites.findIndex(
    value => value.name.trim().toLowerCase() === name.trim().toLowerCase(),
  )
  return findName >= 0 ? true : false
}
