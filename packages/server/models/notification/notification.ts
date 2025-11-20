import { Model, Schema, model } from 'mongoose'

export interface INotifications {
  anonymousUsers: boolean
  body: {
    RUS: string
    ENG: string
  }
  date: Date
  id: string
  img: string
  name: string
  premiumUsers: boolean
  push: boolean
  title: {
    RUS: string
    ENG: string
  }
  unread: boolean
  globalCategory: string
}

export type NotificationsModel = Model<INotifications>

const Notifications = new Schema<INotifications, NotificationsModel>({
  anonymousUsers: { type: Boolean },
  body: {
    RUS: { type: String, reqiured: true },
    ENG: { type: String, reqiured: true },
  },
  date: { type: Date, required: true },
  id: { type: String, unique: true, reqiured: true },
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
})

export const Notification = model<INotifications, NotificationsModel>(
  'Notifications',
  Notifications,
)
