import type { Request, Response } from 'express'
import { serverData } from './../data/const'
const fs = require('fs')
const path = require('path')
require('dotenv').config()
import { FileArray, UploadedFile } from 'express-fileupload'

const checkFiles = async (dir: string) => {
  let files = fs.readdirSync(dir)
  if (files.length <= 0)
    return {
      file: dir,
      size: 0,
      type: dir.includes(`${process.env.FILE_PATH}\\img`) ? 'img' : 'sound',
    }
  files = await Promise.all(
    files.map(async (file: File) => {
      const filePath = path.join(dir, file)
      const stats = fs.statSync(filePath)
      if (stats.isDirectory()) return checkFiles(filePath)
      else if (stats.isFile())
        return {
          file: filePath,
          size: stats.size,
          type: filePath.includes(`${process.env.FILE_PATH}\\img`)
            ? 'img'
            : 'sound',
        }
    }),
  )
  return files.reduce(
    (all: string[], folderContents: string[]) => all.concat(folderContents),
    [],
  )
}

type FileValue = {
  file: string
}

export class fileController {
  uploadFile = async (_req: Request, res: Response) => {
    try {
      const { files } = _req.files as FileArray
      const { path, type, category, directory, name } = _req.body
      const parent =
        path !== 'undefined' ? path : `${type}\\${category}\\${directory}`
      const filePath = `${process.env.FILE_PATH}\\${parent}\\${name}`
      if (fs.existsSync(filePath)) {
        res.status(400).json({
          message: serverData.APInotifications.file.errorFileExists,
        })
      }
      const file = files as UploadedFile
      file.mv(filePath)
      res.json({ message: serverData.APInotifications.file.addFile })
    } catch (e) {
      res.status(400).json({
        message: `${serverData.APInotifications.file.addFileError}: ${(e as Error).message}`,
      })
    }
  }

  getListFiles = async (_req: Request, res: Response) => {
    try {
      const allFilesFullPath = await checkFiles(`${process.env.FILE_PATH}`)
      const allFiles = allFilesFullPath.map((value: FileValue) => {
        value.file = value.file.replace(`${process.env.FILE_PATH}`, '')
        return value
      })
      return res.json({
        message: serverData.APInotifications.file.getFiles,
        list: allFiles,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.file.getFilesError}: ${(e as Error).message}`,
      })
    }
  }

  getFile = async (_req: Request, res: Response) => {
    try {
      const { name } = _req.body
      const allFiles = await checkFiles(`${process.env.FILE_PATH}`)
      const filePath = allFiles.find((value: FileValue) =>
        value.file.includes(name),
      ).file

      if (fs.existsSync(filePath)) {
        return res.download(filePath, name)
      }
      return res.status(400).json({
        message: `${serverData.APInotifications.file.getFileError}`,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.file.getFileError}: ${(e as Error).message}`,
      })
    }
  }

  createFolder = async (_req: Request, res: Response) => {
    try {
      const { path } = _req.body
      const dirPath = `${process.env.FILE_PATH}\\${path}`
      fs.mkdirSync(dirPath, { recursive: true })
      return res.json({ message: serverData.APInotifications.file.addDir })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.file.addFileError}: ${(e as Error).message}`,
      })
    }
  }
}
