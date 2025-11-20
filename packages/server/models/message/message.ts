import { Model, Schema, model } from 'mongoose'

export interface IMessages {
  body: string
  date: Date
  id: string
  title: string
  unread: boolean
  globalCategory: string
}

export type MessagesModel = Model<IMessages>

const Messages = new Schema<IMessages, MessagesModel>({
  body: { type: String, reqiured: true },
  date: { type: Date, required: true },
  id: { type: String, unique: true, reqiured: true },
  title: { type: String, reqiured: true },
  unread: { type: Boolean, required: true },
  globalCategory: { type: String, required: true },
})

export const Message = model<IMessages, MessagesModel>('Messages', Messages)
