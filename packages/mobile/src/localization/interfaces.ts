import { IMUSICCategories, ISOUNDCategories } from '@/store/interfaces'
import { ImageSourcePropType } from 'react-native'

export interface ILocalization {
  RUS: ILocalizationOptions
  ENG: ILocalizationOptions
}

export interface ILocalizationOptions {
  name: string
  currentMix: string
  categorySounds: ISOUNDCategories[]
  categoryMusics: IMUSICCategories[]
  categoryFavorites: ICategoryFavorites[]
  section: ISectonLabel
  headerTitle: IHeaderTitle
  buttons: IButtonsLabel
  loading: string
  newSound: string
  notifications: INotificationLabel
  settings: ISettingsLabel
  modalMessages: IModalMessage
  timer: ITimerMessages
  Messages: ILanguageMessages
  feedback: IFeedbackMessages
  favoritesCat: ImageSourcePropType[] | undefined
}

export interface ICategoryFavorites {
  id: number
  name: string
  category: string
}

export interface ISectonLabel {
  favoriteMix: string
  sounds: string
  musics: string
  settings: string
}

export interface IHeaderTitle {
  sounds: string
  musics: string
  myMixes: string
  meditatons: string
  player: string
  settings: string
  feedback: string
  language: string
  notifications: string
  library: string
  brainWaves: string
  music: string
  sound: string
  timer: string
  login: string
  resetPassword: string
  signUp: string
}

export interface IButtonsLabel {
  add: string
  clear: string
  signIn: string
  signUp: string
  resetPassword: string
}

export interface INotificationLabel {
  noNotifications: string
  title: string
  commentBR: string
  commentMusic: string
  commentSounds: string
}

export interface ISettingsLabel {
  titleDecoration: string
  nameTheme: string
  nameLanguage: string
  titleService: string
  nameAllSizesFile: string
  nameDeleteAllFiles: string
  nameToSupport: string
  titleInformation: string
  nameTermsOfService: string
}

export interface IModalMessage {
  clearSoundList: IModalMessageOptions
  addFavoriteMix: IModalMessageOptions
  editFavoriteMix: IModalMessageOptions
  removeFavoriteMix: IModalMessageOptions
  removeFavoriteAllMix: IModalMessageOptions
  sameNameFound: IModalMessageOptions
  emptyName: IModalMessageOptions
  sameMixFound: IModalMessageOptions
  exitApp: IModalMessageOptions
  OpenDescription: IModalMessageOptions
  downloadFromCloud: IModalMessageOptionsFile
  endDownload: IModalMessageOptions
  deleteFromDevice: IModalMessageOptionsFile
  deleteAllFromDevice: IModalMessageOptions
  endDelete: IModalMessageOptions
  endDeleteAll: IModalMessageOptions
  noFilesToDelete: IModalMessageOptions
  TotalSize: IModalMessageOptions
  feedbackSuccess: IModalMessageOptions
  maxSounds: IModalMessageOptions
  error: IModalMessageOptions
}

export interface IModalMessageOptions {
  typeMessage: string
  category?: string
  show: boolean
  title: string
  message: string
  buttonCancel: string
  buttonYes: string
  message1?: string
  message2?: string
  message3?: string
  message4?: string
}

export interface IModalMessageOptionsFile {
  typeMessage: string
  show: boolean
  title: string
  message: string
  buttonCancel: string
  buttonYes: string
  message1: string
  message2: string
  sound?: string
  id: string
  name: string
  size: string
  category?: string
  storage?: string
}

export interface ITimerMessages {
  mins: string
  hour: string
  hours: string
  individual: string
  stopTimerTitle: string
  timerExitApp: string
  buttonNo: string
  buttonYes: string
}

export interface ILanguageMessages {
  emptyList: string
  emptyBookedList: string
  emptyOwnMixes: string
  element: string
  currentMix: string
  fileNotFound: string
  switchToCloud: string
  noAccount: string
  hasAccount: string
  continueWithoutAccount: string
  forgotPassword: string
  noInternet: string
  resetPassword: string
}

export interface IFeedbackMessages {
  firstName: string
  emailLabel: string
  topicLabel: string
  descriptionLabel: string
  button: string
  errors: {
    intervalSending: string
    incorrectEmail: string
    emptyName: string
    emptyTopic: string
    emptyDescription: string
    maxLengthName: string
    maxLengthTopic: string
    maxLengthDescription: string
    minLengthTopic: string
    minLengthDescription: string
  }
  resultSuccess: string
  resultError: string
}
