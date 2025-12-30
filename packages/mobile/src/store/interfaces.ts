import { ICategoryFavorites } from 'localization/interfaces'
import { IConstantsTheme } from 'theme/interfaces'

export interface IActionFavorites {
  type: string
  payload: IFavoritesContent
}

export interface IFavorites {
  currentId: string | number
  currentMix: string
  favorites: IFavoritesContent[]
}

export interface IFavoritesContent {
  name: string
  id: string | number
  emptyMixName?: string
}

export interface IActionLanguage {
  type: string
  payload: {
    _name: string
    _categorySounds: ISOUNDCategories[]
    _categoriesMusic: IMUSICCategories[]
    _categoryFavorites: ICategoryFavorites
  }
}

export interface IActionTheme {
  type: string
  payload: IConstantsTheme
}

export interface IMusicState {
  id: number
  playing: boolean
  volume?: number
  musicStart?: boolean
  startApp: boolean
  use?: boolean
  booked?: boolean
}

export interface IActionMusicState {
  type: string
  payload: IMusicState
}

export interface ISoundState {
  mixedSound: ISoundStateItems[]
  playAll: boolean
  soundStart: boolean
  startApp: boolean
  musicControl: boolean
  volume: number
  playing: boolean
}

export interface ISoundStateAction {
  mixedSound?: ISoundStateItems[]
  playAll?: boolean
  soundStart?: boolean
  startApp?: boolean
  musicControl?: boolean
  volume?: number
  playing?: boolean
  id?: string
  booked?: boolean
}

export interface IActionSoundState {
  type: string
  payload: ISoundStateItems & ISoundState
}

export interface ISoundStateItems {
  id: number
  playing: boolean
  volume: number
  booked: boolean
  soundStart: boolean
  playAll: boolean
}

export interface ISOUNDS {
  _id: string
  id: string
  name: string
  globalCategory: string
  booked: boolean
  sound: string
  storage: string
  img: string
  imgStorage: string
  location: string
  payment: boolean
  category: {
    RUS: string
    ENG: string
  }
  title: {
    RUS: string
    ENG: string
  }
  description: {
    RUS: string
    ENG: string
  }
  new?: boolean
}

export interface IUpdateSOUNDS {
  _id?: string
  id?: string
  name?: string
  globalCategory?: string
  booked?: boolean
  sound?: string
  storage?: string
  img?: string
  imgStorage?: string
  location?: string
  payment?: boolean
  category?: {
    RUS: string
    ENG: string
  }
  title?: {
    RUS: string
    ENG: string
  }
  description?: {
    RUS: string
    ENG: string
  }
  new?: boolean
}

export interface IMUSICS {
  _id: string
  id: string
  name: string
  globalCategory: string
  booked: boolean
  sound: string
  storage: string
  img: string
  imgStorage: string
  location: string
  payment: boolean
  category: {
    RUS: string
    ENG: string
  }
  title: {
    RUS: string
    ENG: string
  }
  description: {
    RUS: string
    ENG: string
  }
  new?: boolean
}

export interface IUpdateMUSICS {
  _id?: string
  id?: string
  name?: string
  globalCategory?: string
  booked?: boolean
  sound?: string
  storage?: string
  img?: string
  imgStorage?: string
  location?: string
  payment?: boolean
  category?: {
    RUS: string
    ENG: string
  }
  title?: {
    RUS: string
    ENG: string
  }
  description?: {
    RUS: string
    ENG: string
  }
  new?: boolean
}

export interface ISOUNDCategories {
  _id: string
  id: string
  globalCategory: string
  title: {
    RUS: string
    ENG: string
  }
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: string
  name?: string
}

export interface IMUSICCategories {
  _id: string
  id: string
  globalCategory: string
  title: {
    RUS: string
    ENG: string
  }
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: string
  name?: string
}

export interface INOTIFICATIONS {
  _id: string
  anonymousUsers: boolean
  body: {
    RUS: string
    ENG: string
  }
  date: Date
  id: string
  img: string
  name: string
  push: boolean
  title: {
    RUS: string
    ENG: string
  }
  unread: boolean
  premiumUsers: boolean
  globalCategory: string
}

export interface IUpdateNotification {
  id: string
}

export interface IActionDB {
  type: string
  payload:
    | ISOUNDS
    | ISOUNDS[]
    | IMUSICS
    | IMUSICS[]
    | ISOUNDCategories
    | ISOUNDCategories[]
    | IMUSICCategories
    | IMUSICCategories[]
    | INOTIFICATIONS
    | INOTIFICATIONS[]
}

export interface IDBState {
  sounds: ISOUNDS[]
  musics: IMUSICS[]
  soundCategories: ISOUNDCategories[]
  musicCategories: IMUSICCategories[]
  notifications: INOTIFICATIONS[]
}

export interface IUser {
  _id?: string
  id?: string
  createdAt: string
  username: string
  email: string
  name: string
  type: string
  token?: string
  roles: string[]
}

export interface IUserData {
  SOUNDS_Categories: ISOUNDCategories[]
  MUSICS_Categories: IMUSICCategories[]
  DATA_SOUNDS: ISOUNDS[]
  DATA_MUSICS: IMUSICS[]
  Notification: INOTIFICATIONS[]
  personalData: IUser
  appData: IAppData_
  favoritesPlay: IFavorites[]
  _id?: string
}

export interface IActionUser {
  type: string
  payload: {
    createdAt: string
    username: string
    email: string
    name: string
    type: string
    token: string
    roles: string[]
  }
}

export interface IAppData_ {
  language: string
  theme: string
  notificationsByEmail: INotificationsByEmail
}

export interface INotificationsByEmail {
  news: boolean
  newSounds: boolean
  requestStatuses: boolean
}

export interface IActionAppData {
  type: string
  payload: IAppData_
}

export interface IToggleStartSound {
  soundStart: boolean
}

export interface IToggleMusicControl {
  musicControl: boolean
}

export interface IToggleSoundVolume {
  id: number
  volume: number
}

export interface ITogglePlaySound {
  id: number
}

export interface IRemoveSound {
  id: number
}

export interface IChangeCurrentMixPlay {
  name: string
  id?: number
}

export interface IActionModal {
  type: string
  payload: IModal
}

export interface IModal {
  typeMessage?: string
  show: boolean
  title?: string
  message?: string
  buttonCancel?: string
  buttonYes?: string
  category?: string
  id?: number | string
  storage?: string
  name?: string
  sound?: string
}

export interface IActionModalMessage {
  type: string
  payload: IModal
}

export interface IModalMessage {
  typeMessage?: string
  show: boolean
  title?: string
  message?: string
  buttonCancel?: string
  buttonYes?: string
}

export interface IActionProgressBar {
  type: string
  payload: IProgressBar
}

export interface IProgressBar {
  showDownload?: boolean
  showDeleteAll?: boolean
  storage?: string
  name?: string
  category?: string
  id?: number
  title?: string
}

export interface IActionIntervalFeedback {
  type: string
  payload: {
    date: Date
  }
}

export interface IIntervalFeedback {
  date: Date
}

export interface IActionindividualStart {
  type: string
  payload: {
    individual: boolean
  }
}

export interface IindividualStart {
  individual: boolean
}

export interface IActionTimer {
  type: string
  payload: {
    isOn: boolean
    time: number
    selectedTime: number
    closeApp: boolean
    needStopPlay: boolean
    offset: number
    interval: number
  }
}

export interface ITimerState {
  isOn: boolean
  time: number
  selectedTime: number
  closeApp: boolean
  needStopPlay: boolean
  offset: number
  interval: number
}

export interface IError {
  status: number
  message: string
}

export interface IActionError {
  type: string
  payload: {
    status: number
    message: string
  }
}

export interface IToken {
  token: string | null
}

export interface IActionToken {
  type: string
  payload: {
    token: string
  }
}
