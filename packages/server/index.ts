import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createServer } from 'vite'
const mongoose = require('mongoose')
import { apiRouter } from './routers/index.router'
import { isDev, srcPath } from './data/app'
import staticMiddleware from './middleware/static.middleware'
import ssrMiddleware from './middleware/ssr.middleware'
import { downloadFile } from './controllers/files'
import { authMiddleware } from './middleware/authMiddleware'
const fileUpload = require('express-fileupload')
const socket = require('./utils/socket')

async function init() {
  dotenv.config({ path: '../../.env' })
  const app = express()
  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 200 * 1024 * 1024 * 1024, //20MB max file(s) size
      },
      tempFileDir: '/Files/',
    }),
  )

  app.use(express.json({ limit: '50mb' }))
  const corsOptions = {
    origin: [
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://localhost:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.SERVER_PORT}`,
      `http://172.18.0.0:${process.env.CLIENT_PORT}`,
      `http://172.18.0.0:${process.env.SERVER_PORT}`,
      `http://${process.env.SERVER_HOST}:${process.env.CLIENT_PORT}`,
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      `https://${process.env.SERVER_HOST}:${process.env.CLIENT_PORT}`,
      `https://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
      // `http://sd.sb-i.ru:${process.env.CLIENT_PORT}`,
      // `http://sd.sb-i.ru:${process.env.SERVER_PORT}`,
      // `http://www.sd.sb-i.ru:${process.env.CLIENT_PORT}`,
      // `http://www.sd.sb-i.ru:${process.env.SERVER_PORT}`,
      // `https://sd.sb-i.ru:${process.env.CLIENT_PORT}`,
      // `https://sd.sb-i.ru:${process.env.SERVER_PORT}`,
    ],
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))

  app.use('/api', apiRouter)

  if (isDev) {
    const vite = await createServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })
    app.set('vite', vite)
    app.use(vite.middlewares)
  }

  app.use('/assets', staticMiddleware())
  app.use(ssrMiddleware)
  app.use('/Files', authMiddleware, downloadFile)

  app.get('/', (_, res) => {
    res.json('👋 Server ready ')
  })

  const { SERVER_PORT, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env
  const host = isDev ? 'localhost' : MONGO_HOST
  const port = Number(SERVER_PORT) || 3000
  const dbURL = `mongodb://${host}:${MONGO_PORT}/${MONGO_DB}`
  try {
    await mongoose.connect(dbURL)
    const server = app.listen(port, () =>
      console.log(`Server started on PORT ${port}`),
    )

    const io = socket.init(server)
    io.on('connection', () => {
      console.log('Client connected')
    })
  } catch (e) {
    console.log(e)
  }
}

init()
