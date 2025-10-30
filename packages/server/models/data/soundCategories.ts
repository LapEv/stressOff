import { Model, Schema, model } from 'mongoose'

export interface ISoundCategory {
  id: string
  globalCategory: string
  title: {
    RUS: string
    ENG: string
  }
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: {
    RUS: string
    ENG: string
  }
}

export type DataSoundCategoryModel = Model<ISoundCategory>

const SoundCategories = new Schema<ISoundCategory, DataSoundCategoryModel>({
  id: { type: String, unique: true, reqiured: true },
  globalCategory: { type: String, required: true },
  title: {
    RUS: { type: String, reqiured: true },
    ENG: { type: String, reqiured: true },
  },
  img: { type: String },
  imgStorage: { type: String, unique: true, required: true },
  img_lt: { type: String },
  imgStorage_lt: { type: String, unique: true, required: true },
  category: { type: String, required: true },
})

export const SoundCategory = model<ISoundCategory, DataSoundCategoryModel>(
  'Sound Categories',
  SoundCategories,
)
