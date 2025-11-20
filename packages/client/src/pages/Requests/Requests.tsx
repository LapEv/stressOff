import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { Context } from '../../main'
import { MenuBar } from 'components'
import { usePrepareMenuRequestsData } from 'hooks'
import { RequestsModule } from './RequestsData/RequestsModule'

export const Requests = observer(() => {
  const { data } = useContext(Context)

  const items = usePrepareMenuRequestsData(
    data.Requests,
    data.FindUser,
    data.RequestsSort,
  )

  useEffect(() => {
    if (data.showLoading) {
      data.setShowLoading(false)
    }
  }, [items])

  return (
    <div className={cl.general}>
      <MenuBar items={items} type={'requests'} />
      <RequestsModule />
    </div>
  )
})
