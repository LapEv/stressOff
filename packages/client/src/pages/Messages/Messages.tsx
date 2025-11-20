import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { Context } from '../../main'
import { MenuBar } from 'components'
import { usePrepareMenuMessagesData } from 'hooks'
import { MessagesModule } from './MessagesData/MessagesModule'

export const Messages = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuMessagesData(data.Messages)

  useEffect(() => {
    if (data.showLoading) {
      data.setShowLoading(false)
    }
  }, [items])

  return (
    <div className={cl.general}>
      <MenuBar items={items} type={'messages'} />
      <MessagesModule />
    </div>
  )
})
