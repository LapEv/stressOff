import { makeAutoObservable } from 'mobx'
import { IUser } from './interfaces'

export class UserStore {
  _isAuth: boolean
  _user: object
  _showLoading: boolean

  constructor() {
    this._isAuth = false
    this._user = {}
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
    this._user = {}
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
