import type { NextFunction, Request, Response } from 'express'
import type { ViteDevServer } from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import { distPath, isDev, srcPath, ssrClientPath } from '../data/app'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

async function ssrMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.url.startsWith('/api') || req.url.startsWith('/Files')) {
    next()
    return
  }

  const vite = req.app.locals.settings.vite as ViteDevServer
  const url = req.originalUrl

  console.log('ssrMiddleware isDev = ', isDev)
  try {
    let template: string

    if (!isDev) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
    } else {
      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
      template = await vite!.transformIndexHtml(url, template)
    }

    console.log('ssrMiddleware template = ', template)

    let render: (url: string) => Promise<string>
    let store: { getState: () => unknown }

    if (!isDev) {
      render = (await import(ssrClientPath)).render
      store = (await import(ssrClientPath)).store
    } else {
      render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        .render
      store = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        .store
    }

    const appStore = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
      store.getState(),
    )}</script>`

    const cacheKey = 'custom'
    const cache = createCache({ key: cacheKey })
    const { extractCritical } = createEmotionServer(cache)

    const appHtml = await render(url)

    const { html, css, ids } = extractCritical(appHtml)

    const finalHtml = template
      .replace(`<!--ssr-outlet-->`, html)
      .replace(`<!--ssr-store-->`, appStore)
      .replace(
        '</head>',
        `<style data-emotion="${cacheKey} ${ids.join(' ')}">${css}</style></head>`,
      )

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
  } catch (e) {
    if (isDev) {
      vite!.ssrFixStacktrace(e as Error)
    }
    next(e)
  }
}

export default ssrMiddleware
