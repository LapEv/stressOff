import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../../General.module.css'
import { Context } from '../../../main'
import { appData } from 'data/app'
import { emptyUsers } from 'store/data'
import { DropDownGroup, InputGroup } from 'components'

export const FilterData = observer(() => {
  const { data } = useContext(Context)
  const [searchValue, setSearchValue] = useState('')

  const clickSort = (value: string) => {
    const sort = appData.sortStatusUsersArr.find(item => item.name === value)
      ?.value as string
    if (data.UsersSort === value) return
    data.setShowLoading(true)
    if (
      data.CurrentUserObj.personalData.type === sort ||
      data.CurrentUserObj.personalData.roles.includes(sort) ||
      sort === 'all'
    ) {
      const currentID = data.CurrentUserObj._id
      data.setNewBarIndex(currentID)
      data.setUsersSort(value)
      return
    }
    const newUserID = data.Users.find(item =>
      item.personalData.roles.includes(sort),
    )?._id as string
    data.setActiveObjUsersById({ _id: newUserID, position: 0, category: '' })
    data.setNewBarIndex(newUserID)
    data.setUsersSort(value)
  }

  const sortingBySearch = (value: string) => {
    setSearchValue(value)
    if (
      data.CurrentUserObj.personalData.username
        .toLowerCase()
        .includes(value.toLowerCase())
    ) {
      const currentID = data.CurrentUserObj._id
      data.setNewBarIndex('reset')
      setTimeout(() => {
        data.setNewBarIndex(currentID)
      }, 50)
      data.setFindUser(value)
      return
    }
    data.setNullIndex(emptyUsers[0]._id)
    data.setFindUser(value)
  }

  return (
    <div className={cl.sort}>
      {appData.requestLabel.sort}
      <DropDownGroup
        required
        tabIndex={1}
        containerwidth={{ padding: '0px 10px' }}
        style={{ cursor: 'pointer' }}
        data={appData.sortStatusUsersArr}
        value={data.UsersSort || ''}
        keyPress={(value: string) => clickSort(value)}
        onChange={(value: string) => clickSort(value)}
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          clickSort((e.target as HTMLInputElement).textContent)
        }
      />
      <InputGroup
        tabIndex={2}
        id={'2'}
        type={'user'}
        containerwidth={{
          width: '50%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
        style={{ marginLeft: 20 }}
        label={appData.usersLabel.find}
        value={searchValue}
        main="sortingBySearch"
        changetext={sortingBySearch}
      />
    </div>
  )
})
