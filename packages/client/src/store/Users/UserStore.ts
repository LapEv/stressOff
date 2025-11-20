import { makeAutoObservable } from 'mobx'
import { IUser } from './interfaces'
import { emptyUsers } from 'store/data'

export class UserStore {
  _isAuth: boolean
  _user: IUser
  _showLoading: boolean

  constructor() {
    this._isAuth = false
    this._user = emptyUsers[0]
    this._showLoading = false
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }
  setUser(user: IUser) {
    this._user = user
  }
  setShowLoading(bool: boolean) {
    this._showLoading = bool
  }
  setExit() {
    this._isAuth = false
    this._user = emptyUsers[0]
    this._showLoading = false
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get showLoading() {
    return this._showLoading
  }
}
