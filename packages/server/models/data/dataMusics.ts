import { Model, Schema, model } from 'mongoose'

export interface IDataMusic {
  name: string
  id: string
  globalCategory: string
  title: {
    RUS: string
    ENG: string
  }
  description: {
    RUS: string
    ENG: string
  }
  booked: boolean
  sound: string
  storage: string
  img: string
  imgStorage: string
  location: string
  payment: boolean
  category: {
    RUS: string
    ENG: string
  }
  newSound: boolean
}

export type DataMusicModel = Model<IDataMusic>

const DataMusics = new Schema<IDataMusic, DataMusicModel>({
  name: { type: String, required: true },
  id: { type: String, unique: true, reqiured: true },
  globalCategory: { type: String, required: true },
  title: {
    RUS: { type: String, reqiured: true },
    ENG: { type: String, reqiured: true },
  },
  description: {
    RUS: { type: String, reqiured: true },
    ENG: { type: String, reqiured: true },
  },
  booked: { type: Boolean },
  sound: { type: String },
  storage: { type: String, unique: true, required: true },
  img: { type: String },
  imgStorage: { type: String, unique: true, required: true },
  location: { type: String, required: true },
  payment: { type: Boolean },
  category: {
    RUS: { type: String, reqiured: true },
    ENG: { type: String, reqiured: true },
  },
  newSound: { type: Boolean, default: false },
})

export const DataMusic = model<IDataMusic, DataMusicModel>(
  'Data Musics',
  DataMusics,
)
