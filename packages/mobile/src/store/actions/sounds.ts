import {
  ISoundState,
  IToggleSoundVolume,
  IToggleStartSound,
  ITogglePlaySound,
  IRemoveSound,
  ISoundStateAction,
  IToggleMusicControl,
} from '../interfaces'
import {
  ADD_SOUND,
  REMOVE_SOUND,
  TOGGLE_ALL_SOUND,
  TOGGLE_PLAY_SOUND,
  TOGGLE_SOUND_VOLUME,
  CLEAR_SOUND,
  TOGGLE_START_SOUND,
  TOGGLE_MUSIC_CONTROL,
  ADD_FAVORITES_SOUND,
  TOOGLE_BOOKED_SOUND,
} from '../types'

export const AddFavoritesSound = (sound: ISoundState) => {
  return {
    type: ADD_FAVORITES_SOUND,
    payload: sound,
  }
}

export const AddSound = (sound: ISoundStateAction) => {
  return {
    type: ADD_SOUND,
    payload: sound,
  }
}

export const RemoveSound = (sound: IRemoveSound) => {
  return {
    type: REMOVE_SOUND,
    payload: sound,
  }
}

export const ToggleAllSound = (sound: ISoundStateAction) => {
  return {
    type: TOGGLE_ALL_SOUND,
    payload: sound,
  }
}

export const TogglePlaySound = (sound: ITogglePlaySound) => {
  return {
    type: TOGGLE_PLAY_SOUND,
    payload: sound,
  }
}

export const ToggleSoundVolume = (sound: IToggleSoundVolume) => {
  return {
    type: TOGGLE_SOUND_VOLUME,
    payload: sound,
  }
}

export const ClearSound = (sound: ISoundState | null) => {
  return {
    type: CLEAR_SOUND,
    payload: sound,
  }
}

export const ToggleStartSound = ({ soundStart }: IToggleStartSound) => {
  return {
    type: TOGGLE_START_SOUND,
    payload: soundStart,
  }
}

export const ToggleMusicControl = (sound: IToggleMusicControl) => {
  return {
    type: TOGGLE_MUSIC_CONTROL,
    payload: sound,
  }
}

export const ToggleBookedSound = (sound: ISoundState) => {
  return {
    type: TOOGLE_BOOKED_SOUND,
    payload: sound,
  }
}
