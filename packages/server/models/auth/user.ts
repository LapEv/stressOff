import { Model, Schema, model } from 'mongoose'
import { IFavorites } from './favorites'

export interface INotificationForUser {
  anonymousUsers: boolean
  body: {
    RUS: string
    ENG: string
  }
  date: string
  id: string
  img: string
  name: string
  premiumUsers: boolean
  push: { type: boolean; required: true }
  title: {
    RUS: string
    ENG: string
  }
  unread: boolean
  globalCategory: string
}

export interface IUser {
  save: () => Promise<IUser>
  globalCategory: string
  personalData: {
    username: string
    password: string
    email: string
    name: string
    type: string
    roles: string[]
    createdAt: string
    token: string
  }
  appData: {
    language: string
    theme: string
    notificationsByEmail: {
      news: boolean
      newSounds: boolean
      requestStatuses: boolean
    }
  }
  Notification: INotificationForUser[]
  SOUNDS_Categories: {
    category: string
    id: string
    imgStorage: string
    imgStorage_lt: string
  }[]
  MUSICS_Categories: {
    category: string
    id: string
    imgStorage: string
    imgStorage_lt: string
  }[]
  DATA_SOUNDS: {
    name: string
    id: string
    imgStorage: string
    storage: string
    location: string
    booked: boolean
    newSound: boolean
    payment: boolean
  }[]
  DATA_MUSICS: {
    name: string
    id: string
    imgStorage: string
    storage: string
    location: string
    booked: boolean
    newSound: boolean
    payment: boolean
  }[]
  favoritesPlay?: IFavorites[]
}

export type UserModel = Model<IUser>

const Users = new Schema<IUser, UserModel>({
  globalCategory: { type: String, reqiured: true },
  personalData: {
    username: { type: String, unique: true, required: true },
    password: { type: String, reqiured: true },
    email: { type: String, unique: true },
    name: { type: String },
    type: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    createdAt: { type: String, required: true },
    token: { type: String, required: true },
  },
  appData: {
    language: { type: String, required: true },
    theme: { type: String, required: true },
    notificationsByEmail: {
      news: { type: Boolean, required: true },
      newSounds: { type: Boolean, required: true },
      requestStatuses: { type: Boolean, required: true },
    },
  },
  Notification: [
    {
      anonymousUsers: { type: Boolean },
      body: {
        RUS: { type: String, reqiured: true },
        ENG: { type: String, reqiured: true },
      },
      date: { type: String, required: true },
      id: { type: String, reqiured: true },
      img: { type: String },
      name: { type: String, required: true },
      premiumUsers: { type: Boolean, required: true },
      push: { type: Boolean, required: true },
      title: {
        RUS: { type: String, reqiured: true },
        ENG: { type: String, reqiured: true },
      },
      unread: { type: Boolean, required: true },
      globalCategory: { type: String, required: true },
    },
  ],
  SOUNDS_Categories: [
    {
      category: { type: String, required: true },
      id: { type: String, required: true },
      imgStorage: { type: String },
      imgStorage_lt: { type: String },
    },
  ],
  MUSICS_Categories: [
    {
      category: { type: String, required: true },
      id: { type: String, required: true },
      imgStorage: { type: String },
      imgStorage_lt: { type: String },
    },
  ],
  DATA_SOUNDS: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true },
      imgStorage: { type: String },
      storage: { type: String },
      location: { type: String, required: true },
      booked: { type: Boolean, required: true },
      newSound: { type: Boolean, default: false },
      payment: { type: Boolean, default: false },
    },
  ],
  DATA_MUSICS: [
    {
      name: { type: String, required: true },
      id: { type: String, required: true },
      imgStorage: { type: String },
      storage: { type: String },
      location: { type: String, required: true },
      booked: { type: Boolean, required: true },
      newSound: { type: Boolean, default: false },
      payment: { type: Boolean, default: false },
    },
  ],
  favoritesPlay: [
    {
      StateMusic: {
        booked: { type: Boolean },
        id: { type: String },
        musicStart: { type: Boolean },
        playing: { type: Boolean },
        startApp: { type: Boolean },
        volume: { type: Number },
      },
      StateSound: {
        mixedSound: [
          {
            booked: { type: Boolean },
            id: { type: String },
            playing: { type: Boolean },
            volume: { type: Number },
          },
        ],
        musicControl: { type: Boolean },
        playAll: { type: Boolean },
        soundStart: { type: Boolean },
        startApp: { type: Boolean },
      },
      category: { type: String },
      id: { type: Number },
      name: { type: String },
    },
  ],
})

export const User = model<IUser, UserModel>('user', Users)
