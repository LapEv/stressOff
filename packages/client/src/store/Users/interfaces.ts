import { IAppData } from '../Data/interfaces'

export interface IUserStore {
  _isAuth: boolean
  _user: object
  _showLoading: boolean
}

export interface IUser {
  personalData: IPersonalData
  appData: IAppData
  globalCategory: string
  _id: string
}

export interface IPersonalData {
  createdAt: string
  username: string
  email: string
  name: string
  type: string
  token: string
  roles: string[]
}
