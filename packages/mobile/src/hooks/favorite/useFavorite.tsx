import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { favoriteActions } from './favoriteActions'
import { IFavorites } from '@/store/interfaces'
import { useDispatch } from 'react-redux'
import { IChangeCurrentMixPlay } from '@/store/interfaces'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'

export function useFavorite(): [IFavorites, favoriteActions] {
  const favorites = useSelector<RootState>(
    state => state.favorites,
  ) as IFavorites
  const dispatch = useDispatch()

  return [
    favorites,
    {
      ChangeCurrentMixPlay(data: IChangeCurrentMixPlay) {
        dispatch(ChangeCurrentMixPlay(data))
      },
    },
  ]
}
