import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from './Loading.module.css'
import { Context } from '../../main'

export const Loading = observer(() => {
  const { data } = useContext(Context)

  const rootClasses = [cl.loading]
  const rootContent = [cl.loader]

  if (data.showLoading) {
    rootClasses.push(cl.active)
    rootContent.push(cl.active)
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={rootContent.join(' ')}></div>
    </div>
  )
})
