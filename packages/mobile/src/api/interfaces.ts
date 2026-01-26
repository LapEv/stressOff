export interface IObject {
  name: string
}

export interface IRegistration {
  username: string
  password: string
  email: string
}

export interface IUpdateStatusSound {
  _id: string
  newSound: boolean
  userID: string
}
