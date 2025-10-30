import path from 'path'

export const appConstants = { appName: 'STRESSOFF' }
export const isDev = process.env.NODE_ENV === 'development'
export const srcPath = path.resolve(__dirname, '../../client/')
export const distPath = path.resolve(__dirname, '../../client/dist/')
export const ssrClientPath = path.resolve(
  __dirname,
  '../../client/dist-ssr/client.cjs',
)
