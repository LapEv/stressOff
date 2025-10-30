import { Schema, model, Document, Model } from 'mongoose'

export interface IDataSound extends Document {
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
}

export type DataSoundModel = Model<IDataSound>

const DataSounds = new Schema<IDataSound, DataSoundModel>({
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
})

export const DataSound = model<IDataSound, DataSoundModel>(
  'Data Sounds',
  DataSounds,
)
