import {
  createStore,
  combineReducers,
  applyMiddleware,
  $CombinedState,
} from 'redux'
import { thunk } from 'redux-thunk'
import { soundReducer } from './reducers/sounds'
import { musicReducer } from './reducers/music'
import { modalReducer } from './reducers/modal'
import { modalMessageReducer } from './reducers/modalMessage'
import { favoritesReducer } from './reducers/favorites'
import { DBReducer } from './reducers/db'
import { ProgressBarReducer } from './reducers/progressBar'
import { timerReducer } from './reducers/timer'
import { individualTimerReducer } from './reducers/individualTimer'
import { IntervalFeedbackReducer } from './reducers/intervalFeedback'
import { userReducer } from './reducers/user'
import { themeReducer } from './reducers/theme'
import { languageReducer } from './reducers/language'
import { errorReducer } from './reducers/error'
import {
  IAppData_,
  IDBState,
  IError,
  IFavorites,
  IindividualStart,
  IIntervalFeedback,
  IModal,
  IModalMessage,
  IMusicState,
  IProgressBar,
  ISoundState,
  ITimerState,
  IToken,
  IUser,
} from './interfaces'
import { ILocalizationOptions } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import { tokenReducer } from './reducers/token'
import { appDataReducer } from './reducers/appData'

const rootReducer = combineReducers({
  sound: soundReducer,
  music: musicReducer,
  modal: modalReducer,
  modalMessage: modalMessageReducer,
  favorites: favoritesReducer,
  db: DBReducer,
  progressBar: ProgressBarReducer,
  timer: timerReducer,
  individualTimer: individualTimerReducer,
  intervalFeedback: IntervalFeedbackReducer,
  user: userReducer,
  theme: themeReducer,
  language: languageReducer,
  error: errorReducer,
  token: tokenReducer,
  appData: appDataReducer,
})

export type RootState = {
  readonly [$CombinedState]?: undefined
} & {
  db: IDBState
} & {
  sound: ISoundState
} & {
  music: IMusicState
} & {
  language: ILocalizationOptions
} & {
  favorites: IFavorites
} & {
  theme: ITheme
} & {
  user: IUser
} & {
  modal: IModal
} & {
  modalMessage: IModalMessage
} & {
  progressBar: IProgressBar
} & {
  intervalFeedback: IIntervalFeedback
} & {
  individualTimer: IindividualStart
} & {
  timer: ITimerState
} & {
  error: IError
} & {
  token: IToken
} & {
  appData: IAppData_
}
export default createStore(rootReducer, applyMiddleware(thunk))
