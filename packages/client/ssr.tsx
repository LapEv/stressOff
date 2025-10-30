import { createContext } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { store } from './src/store'
import { App } from './src/App'

export const Context = createContext(store)

export function render(url: string) {
  return renderToString(
    <Context.Provider value={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Context.Provider>,
  )
}
