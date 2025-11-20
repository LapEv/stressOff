import { Model, Schema, model } from 'mongoose'

export interface IRequests {
  description: string
  date: Date
  lastModifiedDate: string
  number: string
  email: string
  name: string
  topic: string
  unread: boolean
  status: string
  solution: string
  userID: string
  globalCategory: string
  history: {
    date: Date
    status: string
    userID: string
    username: string
    solution: string
  }[]
}

export type RequestsModel = Model<IRequests>

const Request = new Schema<IRequests, RequestsModel>({
  description: { type: String, required: true },
  date: { type: Date, required: true },
  lastModifiedDate: { type: String, required: true },
  number: { type: String, unique: true, reqiured: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  topic: { type: String, required: true },
  unread: { type: Boolean },
  status: { type: String, required: true },
  solution: { type: String },
  userID: { type: String, required: true },
  globalCategory: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      status: { type: String, required: true },
      userID: { type: String, required: true },
      username: { type: String, required: true },
      solution: { type: String },
    },
  ],
})

export const Requests = model<IRequests, RequestsModel>('Requests', Request)
