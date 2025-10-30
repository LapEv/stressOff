import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'store'
import { App } from './App'

export const Context = createContext(store)

export const Main = () => (
  <Context.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
)
ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <Main />)
