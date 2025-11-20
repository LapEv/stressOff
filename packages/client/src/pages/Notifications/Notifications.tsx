import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { Context } from '../../main'
import { MenuBar } from 'components'
import { usePrepareMenuNotificationsData } from 'hooks'
import { NotificationModule } from './NotificationsData/NotificationModule'

export const Notifications = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuNotificationsData(data.Notifications)

  return (
    <div className={cl.general}>
      <MenuBar items={items} type={'notifications'} />
      <NotificationModule />
    </div>
  )
})
