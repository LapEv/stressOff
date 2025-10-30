import type { Request, Response } from 'express'
import { DataSound, DataSoundModel } from '../models/data/dataSounds'
import { DataMusic, DataMusicModel } from '../models/data/dataMusics'
import {
  DataMusicCategoryModel,
  MusicCategory,
} from '../models/data/musicCategories'
import {
  DataSoundCategoryModel,
  SoundCategory,
} from '../models/data/soundCategories'
import { serverData } from '../data/const'

interface IRequest {
  req: Request
  res: Response
  model:
    | DataSoundModel
    | DataMusicModel
    | DataSoundCategoryModel
    | DataMusicCategoryModel
}

const writeFullData = async ({ req, res, model }: IRequest) => {
  try {
    const data = req.body
    for (const item of data) {
      const newData = new model(item)
      await newData.save()
    }
    return res.json({ message: serverData.APInotifications.data.writeFullData })
  } catch (e) {
    return res.status(400).json({
      message: `${serverData.APInotifications.data.writeFullDataError}: ${(e as Error).message}`,
    })
  }
}

const addData = async ({ req, res, model }: IRequest) => {
  try {
    const newData = new model(req.body)
    const result = await newData.save()
    return res.json({
      message: serverData.APInotifications.data.addData,
      object: result,
    })
  } catch (e) {
    return res.status(400).json({
      message: `${serverData.APInotifications.data.addDataError}: ${(e as Error).message}`,
    })
  }
}

export class dataController {
  writeFullSoundsData = (req: Request, res: Response) => {
    writeFullData({ req, res, model: DataSound })
  }

  writeFullMusicsData = (req: Request, res: Response) => {
    writeFullData({ req, res, model: DataMusic })
  }

  writeFullSoundCategories = (req: Request, res: Response) => {
    writeFullData({ req, res, model: SoundCategory })
  }

  writeFullMusicCategories = (req: Request, res: Response) => {
    writeFullData({ req, res, model: MusicCategory })
  }

  getFullSoundsData = async (_req: Request, res: Response) => {
    try {
      const data = await DataSound.find()
      return res.json(data)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.getFullDataError}: ${(e as Error).message}`,
      })
    }
  }

  getFullMusicsData = async (_req: Request, res: Response) => {
    try {
      const data = await DataMusic.find()
      return res.json(data)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.getFullDataError}: ${(e as Error).message}`,
      })
    }
  }

  getFullSoundCategories = async (_req: Request, res: Response) => {
    try {
      const data = await SoundCategory.find()
      return res.json(data)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.getFullDataError}: ${(e as Error).message}`,
      })
    }
  }

  getFullMusicCategories = async (_req: Request, res: Response) => {
    try {
      const data = await MusicCategory.find()
      return res.json(data)
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.getFullDataError}: ${(e as Error).message}`,
      })
    }
  }

  deleteSoundDataById = async (req: Request, res: Response) => {
    try {
      const result = await DataSound.findOneAndDelete(req.body)
      return res.json({
        message: serverData.APInotifications.data.deleteObject,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteDataByIdError}: ${(e as Error).message}`,
      })
    }
  }

  deleteMusicDataById = async (req: Request, res: Response) => {
    try {
      const result = await DataMusic.findOneAndDelete(req.body)
      return res.json({
        message: serverData.APInotifications.data.deleteObject,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteDataByIdError}: ${(e as Error).message}`,
      })
    }
  }

  deleteSoundCategoriesById = async (req: Request, res: Response) => {
    try {
      const result = await SoundCategory.findOneAndDelete(req.body)
      return res.json({
        message: serverData.APInotifications.data.deleteObject,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteDataByIdError}: ${(e as Error).message}`,
      })
    }
  }

  deleteMusicCategoriesById = async (req: Request, res: Response) => {
    try {
      const result = await MusicCategory.findOneAndDelete(req.body)
      return res.json({
        message: serverData.APInotifications.data.deleteObject,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteDataByIdError}: ${(e as Error).message}`,
      })
    }
  }

  deleteAllSound = async (_req: Request, res: Response) => {
    try {
      await DataSound.deleteMany({
        globalCategory: serverData.dataConsts.globalCategorySound,
      })
      return res.json({
        message: serverData.APInotifications.data.deleteAllObject,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteAllDataError}: ${(e as Error).message}`,
      })
    }
  }

  deleteAllMusic = async (_req: Request, res: Response) => {
    try {
      await DataMusic.deleteMany({
        globalCategory: serverData.dataConsts.globalCategoryMusic,
      })
      return res.json({
        message: serverData.APInotifications.data.deleteAllObject,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteAllDataError}: ${(e as Error).message}`,
      })
    }
  }

  deleteAllSoundCategories = async (_req: Request, res: Response) => {
    try {
      await SoundCategory.deleteMany({
        globalCategory: serverData.dataConsts.globalSoundCategories,
      })
      return res.json({
        message: serverData.APInotifications.data.deleteAllObject,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteAllDataError}: ${(e as Error).message}`,
      })
    }
  }

  deleteAllMusicCategories = async (_req: Request, res: Response) => {
    try {
      await MusicCategory.deleteMany({
        globalCategory: serverData.dataConsts.globalMusicCategories,
      })
      return res.json({
        message: serverData.APInotifications.data.deleteAllObject,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.deleteAllDataError}: ${(e as Error).message}`,
      })
    }
  }

  updateSoundDataById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const result = await DataSound.updateOne({ id: id }, req.body)
      return res.json({
        message: serverData.APInotifications.data.updateData,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.updateDataError}: ${(e as Error).message}`,
      })
    }
  }

  updateMusicDataById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const result = await DataMusic.updateOne({ id: id }, req.body)
      return res.json({
        message: serverData.APInotifications.data.updateData,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.updateDataError}: ${(e as Error).message}`,
      })
    }
  }

  updateSoundCategoriesById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const result = await SoundCategory.updateOne({ id: id }, req.body)
      return res.json({
        message: serverData.APInotifications.data.updateData,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.updateDataError}: ${(e as Error).message}`,
      })
    }
  }

  updateMusicCategoriesById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body
      const result = await MusicCategory.updateOne({ id: id }, req.body)
      return res.json({
        message: serverData.APInotifications.data.updateData,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.data.updateDataError}: ${(e as Error).message}`,
      })
    }
  }

  addNewSound(req: Request, res: Response) {
    addData({ req, res, model: DataSound })
  }

  addNewMusic(req: Request, res: Response) {
    addData({ req, res, model: DataMusic })
  }

  addNewSoundCategory(req: Request, res: Response) {
    addData({ req, res, model: SoundCategory })
  }

  addNewMusicCategory(req: Request, res: Response) {
    addData({ req, res, model: MusicCategory })
  }
}
