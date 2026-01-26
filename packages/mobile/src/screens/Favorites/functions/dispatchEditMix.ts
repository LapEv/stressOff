import store from '@/store'
import { EditFavoritesMixes } from '@/store/actions/favorites'
import { showModal } from '@/store/actions/modal'
import { IFavorites, IUser } from '@/store/interfaces'

export const dispatchEditFavoritesMix = async (id: number, name: string) => {
  store.dispatch(
    EditFavoritesMixes({
      id: id,
      name: name,
    }),
  )
  const favorites = (store.getState().favorites as IFavorites).favorites
  const uid = (store.getState().user as IUser)._id
  await updateFavoritesDB(favorites, uid, true)
  store.dispatch(showModal({ show: false }))
}
