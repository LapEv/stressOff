import express from 'express'
import path from 'path'
import { distPath, isDev } from '../data/app'

const staticMiddleware = () => {
  if (isDev) {
    return () => undefined
  }
  return express.static(path.resolve(distPath, 'assets'))
}
export default staticMiddleware
