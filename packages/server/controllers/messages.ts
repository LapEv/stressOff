import { serverData } from './../data/const'
import type { Request, Response } from 'express'
import { IMessages, Message } from '../models/message/message'
const socket = require('../utils/socket')

export class messagesController {
  addMessage = async (req: Request, res: Response) => {
    try {
      const id = (await Message.estimatedDocumentCount()) + 1
      const date = new Date()
      const newMessage = new Message({ ...req.body, date, id })
      const result = await newMessage.save()
      socket.getIO().emit('server', { newMessage })
      return res.json({
        message: serverData.APInotifications.message.addMessage,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.message.addMessageError}: ${(e as Error).message}`,
      })
    }
  }

  async getAllMessages(_req: Request, res: Response) {
    try {
      const data = await Message.find()
      return res.json(data)
    } catch (e) {
      res.status(400).json({
        message: `${serverData.APInotifications.message.getAllMessagesError}: ${(e as Error).message}`,
      })
    }
  }

  async updateUnreadInMessage(req: Request, res: Response) {
    try {
      const { id } = req.body
      const result = await Message.updateOne({ id: id }, req.body)
      return res.json({
        message: serverData.APInotifications.message.updateUnreadInMessage,
        object: result,
      })
    } catch (e) {
      return res.status(400).json({
        message: `${serverData.APInotifications.message.updateUnreadInMessageError}: ${(e as Error).message}`,
      })
    }
  }

  async addMessagefromServer(data: IMessages) {
    try {
      const id = (await Message.estimatedDocumentCount()) + 1
      const date = new Date()
      const newMessage = new Message({ ...data, date, id })
      const result = await newMessage.save()
      socket.getIO().emit('server', { newMessage })
      return {
        message: serverData.APInotifications.message.addMessage,
        object: result,
      }
    } catch (e) {
      return {
        message: `${serverData.APInotifications.message.addMessageError}: ${(e as Error).message}`,
      }
    }
  }
}
