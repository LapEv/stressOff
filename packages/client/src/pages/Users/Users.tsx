import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { Context } from '../../main'
import { usePrepareMenuUsersData } from '../../hooks/usePrepareMenuData'
import { MenuBar } from 'components'
import { UsersModule } from './UsersData/UsersModule'

export const Users = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuUsersData(
    data.Users,
    data.FindUser,
    data.UsersSort,
  )

  const roles = data.Roles.map(({ value, _id }) => {
    return {
      name: value,
      value,
      _id,
    }
  })

  useEffect(() => {
    if (data.showLoading) {
      data.setShowLoading(false)
    }
  }, [items])

  return (
    <div className={cl.general}>
      <MenuBar items={items} type={'users'} />
      <UsersModule roles={roles} />
    </div>
  )
})
