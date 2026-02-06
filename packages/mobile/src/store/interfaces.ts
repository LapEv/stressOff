import { ICategoryFavorites } from 'localization/interfaces'
import { ImageSourcePropType } from 'react-native'
import { IConstantsTheme } from 'theme/interfaces'

export interface ILanguageObject {
  RUS: string
  ENG: string
}
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
  _id: string
  emptyMixName?: string
}

export interface IActionLanguage {
  type: string
  payload: {
    _name: string
    _categorySounds: ICategories[]
    _categoriesMusic: ICategories[]
    _categoryFavorites: ICategoryFavorites
  }
}

export interface IActionTheme {
  type: string
  payload: IConstantsTheme
}

export interface IPlayState {
  musicPlay: IMusicState
  soundsPlay: ISoundState
  playAll: boolean
}

export interface IPlayStateAction {
  type: string
  payload: ISoundStateItemsAction & ISoundStateItems
}

// export interface IPlayAction {
//   musicPlay: IMusicState
//   soundsPlay: ISoundStateAction
//   playAll: boolean
//   startApp: boolean
// }

export interface IMusicState {
  _id: string
  id: number
  playing: boolean
  volume: number
  musicStart: boolean
  img: ImageSourcePropType
}

// export interface IActionMusicState {
//   type: string
//   payload: IMusicState
// }

export interface ISoundState {
  mixedSound: ISoundStateItems[]
  soundStart: boolean
  musicControl: boolean
  volume: number
  playing: boolean
}

// export interface ISoundStateAction {
//   mixedSound: ISoundStateItemsAction[]
//   soundStart: boolean
//   musicControl: boolean
//   volume: number
//   playing: boolean
// }

// export interface IActionSoundState {
//   type: string
//   payload: ISoundStateItemsAction & ISoundStateAction
// }

export interface ISoundStateItems {
  _id: string
  id: string
  playing: boolean
  volume: number
  booked: boolean
  soundStart?: boolean
  img: ImageSourcePropType
  location: string
  storage: string
  title: ILanguageObject
}

export interface ISoundStateItemsAction {
  _id?: string
  id?: string
  playing?: boolean
  volume?: number
  booked?: boolean
  soundStart?: boolean
  img?: ImageSourcePropType
  location?: string
  storage?: string
  title?: ILanguageObject
}

export interface IPlayAll {
  playAll: boolean
}

export interface IPlay_ID {
  _id: string
}

export interface ISOUNDS {
  _id: string
  id: string
  name: string
  globalCategory: string
  booked: string
  sound: string
  storage: string
  img: string
  imgStorage: string
  location: string
  payment: string
  category: string
  title: string
  description: string
  newSound: string
}

export interface ISOUNDSFB {
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
  category: ILanguageObject
  title: ILanguageObject
  description: string
  newSound: boolean
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
  category?: ILanguageObject
  title?: ILanguageObject
  description?: ILanguageObject
  new?: boolean
}

export interface ICategories {
  _id: string
  id: string
  globalCategory: string
  title: string
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: string
  name?: string
}

export interface ICategoriesFB {
  _id: string
  id: string
  globalCategory: string
  title: ILanguageObject
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: string
  name?: string
}
export interface INOTIFICATIONSFB {
  _id: string
  anonymousUsers: boolean
  body: ILanguageObject
  date: Date
  id: string
  img: string
  name: string
  push: boolean
  title: ILanguageObject
  unread: boolean
  premiumUsers: boolean
  globalCategory: string
}

export interface INOTIFICATIONS {
  _id: string
  anonymousUsers: boolean
  body: string
  date: string
  id: string
  img: string
  name: string
  push: string
  title: string
  unread: string
  premiumUsers: string
  globalCategory: string
}

export interface IUpdateNotification {
  id: string
}

export interface IActionDB {
  type: string
  payload:
    | ISOUNDS
    | ICategories
    | ISOUNDS[]
    | ICategories[]
    | INOTIFICATIONS
    | INOTIFICATIONS[]
}

export interface IDBState {
  sounds: ISOUNDS[]
  musics: ISOUNDS[]
  soundCategories: ICategories[]
  musicCategories: ICategories[]
  notifications: INOTIFICATIONS[]
}

export interface IUser {
  _id: string
  id: string
  createdAt: string
  username: string
  email: string
  name: string
  type: string
  token?: string
  roles: string
}

export interface IUserFB {
  _id?: string
  id: string
  createdAt: string
  username: string
  email: string
  name: string
  type: string
  token?: string
  roles: string[]
}

export interface IUserData {
  SOUNDS_Categories: ISOUNDS[]
  MUSICS_Categories: ISOUNDS[]
  DATA_SOUNDS: ISOUNDS[]
  DATA_MUSICS: ISOUNDS[]
  Notification: INOTIFICATIONS[]
  personalData: IUser
  appData: IAppData_
  favoritesPlay: IFavorites[]
  _id?: string
}

export interface IUserDataFB {
  SOUNDS_Categories: ICategoriesFB[]
  MUSICS_Categories: ICategoriesFB[]
  DATA_SOUNDS: ISOUNDSFB[]
  DATA_MUSICS: ISOUNDSFB[]
  Notification: INOTIFICATIONSFB[]
  personalData: IUserFB
  appData: IAppDataFB_
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

export interface IAppDataFB_ {
  language: string
  theme: string
  notificationsByEmail: INotificationsByEmail
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
  _id: string
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
  payload: boolean
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
  payload: string | null
}

export interface IConnect {
  isConnected: boolean
  pathServer: string
}

export interface IActionConnect {
  type: string
  payload: boolean & string
}

export interface IUnsentData {
  type: string
  data: Record<string, unknown>
}

export interface IUnsentData_ {
  type: string
  data: string
  status: string
  id: string
}
