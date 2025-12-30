import store from '@/store'
import { IFavorites, IMusicState, ISoundState } from '@/store/interfaces'

export const CheckForFavoriteContent = () => {
  const StateSound = store.getState().sound as ISoundState
  const StateMusic = store.getState().music as IMusicState
  const favorites = (store.getState().favorites as IFavorites).favorites

  const favMusicIdent = favorites.filter(value => value.id == StateMusic.id)

  if (favMusicIdent.length <= 0) return false

  const currentSoundsId = StateSound.mixedSound.map(value => value.id).sort()

  const result = favMusicIdent.find(value => {
    const arrId = value.map(id => id.id).sort()
    return JSON.stringify(arrId) === JSON.stringify(currentSoundsId)
      ? value
      : null
  })
  return result?.name
}
