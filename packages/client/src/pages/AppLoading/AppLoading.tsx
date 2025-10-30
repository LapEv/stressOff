import { memo } from 'react'
import cl from './AppLoading.module.css'
import logo from 'images/lotus.gif'

export const AppLoading = memo(() => {
  return (
    <div className={cl.start}>
      <img className={cl.gif} alt="AppLoading" src={logo} />
    </div>
  )
})
