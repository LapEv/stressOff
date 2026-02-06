import {
  ADD_FAVORITES_MIXES,
  // LOAD_FAVORITES_MIXES,
  EDIT_FAVORITES_MIXES,
  // REMOVE_FAVORITES_MIXES,
  // REMOVE_FAVORITES_ALL_MIXES,
  CHANGE_CURRENT_MIX_PLAY,
} from '../types'
import { IActionFavorites, IFavorites } from '../interfaces'
import { Reducer } from 'react'

const initialState = {
  currentId: 0,
  currentMix: '',
  favorites: [],
} as IFavorites

export const favoritesReducer: Reducer<IFavorites, IActionFavorites> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_FAVORITES_MIXES:
      return {
        ...state,
        favorites: [...state.favorites, { ...action.payload }],
        currentMix: action.payload.name,
        currentId: action.payload._id,
      }
    // case LOAD_FAVORITES_MIXES:
    //   return {
    //     ...state,
    //     favorites: action.payload,
    //   }
    case EDIT_FAVORITES_MIXES: {
      const favoritesMixes = state.favorites.map(mixes => {
        if (mixes._id === action.payload._id) {
          mixes.name = action.payload.name
        }
        return mixes
      })
      return {
        ...state,
        favoritesMixes,
        currentMix:
          state.currentId === action.payload._id
            ? action.payload.name
            : state.currentMix,
      }
    }
    // case REMOVE_FAVORITES_MIXES: {
    //   const favoritesFilter = state.favorites.filter(
    //     value => value._id !== action.payload._id,
    //   )
    //   let i = 1
    //   const reindex = favoritesFilter.map(value => {
    //     value._id = Number(i)
    //     i++
    //     return value
    //   })
    //   return {
    //     ...state,
    //     favorites: reindex,
    //     currentMix:
    //       state.currentId === action.payload._id
    //         ? action.payload.emptyMixName
    //         : state.currentMix,
    //   }
    // }
    // case REMOVE_FAVORITES_ALL_MIXES:
    //   return {
    //     ...state,
    //     favorites: [],
    //     currentMix: action.payload.emptyMixName,
    //   }

    case CHANGE_CURRENT_MIX_PLAY:
      return {
        ...state,
        currentMix: action.payload.name,
        currentId: action.payload._id,
      }

    default:
      return state
  }
}
