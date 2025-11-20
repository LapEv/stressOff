import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import { appData } from 'data/app'
import { IREQUESTS } from 'store/Data/interfaces'
import { getUniqueBy } from 'functions'
import { DropDownGroup, InputGroup } from 'components'

export const RequestSort = observer(() => {
  const { data } = useContext(Context)
  const [searchValue, setSearchValue] = useState('')

  const setNullIdSort = (sort: string) => {
    const itemsIds = getUniqueBy(data.Requests, 'status')?.map(
      (value: IREQUESTS) => {
        return {
          number: value.number,
          status: value.status,
          _id: value._id,
        }
      },
    )
    const firstElement = itemsIds?.find(element => element.status === sort)
    data.setNewBarIndex(firstElement?._id ?? data.Requests[0]._id)
  }

  const setNullIdFind = (item: string) => {
    const finded = data.Requests.find(
      value =>
        value.number.toLowerCase().includes(item.toLowerCase()) ||
        value.email.toLowerCase().includes(item.toLowerCase()) ||
        value.userID.toLowerCase().includes(item.toLowerCase()),
    )
    data.setNewBarIndex(finded?._id ?? data.Requests[0]._id)
  }

  const clickSort = (value: string) => {
    const sort = appData.sortStatusRequestArr.find(
      item => item.name === value,
    )?.value
    if (!sort) return
    if (data.RequestsSort === sort) return
    data.setShowLoading(true)
    if (data.CurrentRequestObj.status === sort || sort === 'all') {
      const currentID = data.CurrentObj._id
      data.setNewBarIndex('reset')
      setTimeout(() => {
        data.setNewBarIndex(currentID)
      }, 50)
      data.setRequestSort(sort)
      return
    }
    setNullIdSort(sort)
    data.setRequestSort(sort)
  }

  const sortingBySearch = (value: string) => {
    setSearchValue(value)
    if (
      data.CurrentRequestObj.number
        .toLowerCase()
        .includes(value.toLowerCase()) ||
      data.CurrentRequestObj.email
        .toLowerCase()
        .includes(value.toLowerCase()) ||
      data.CurrentRequestObj.userID.toLowerCase().includes(value.toLowerCase())
    ) {
      const currentID = data.CurrentRequestObj._id
      data.setNewBarIndex('reset')
      setTimeout(() => {
        data.setNewBarIndex(currentID)
      }, 50)
      data.setFindUser(value)
      return
    }
    setNullIdFind(value)
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
        data={appData.sortStatusRequestArr}
        value={
          appData.sortStatusRequestArr.find(
            item => item.value === data.RequestsSort,
          )?.name || ''
        }
        keyPress={(value: string) => clickSort(value)}
        onChange={(value: string) => clickSort(value)}
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          clickSort((e.target as HTMLInputElement).textContent)
        }
      />
      <InputGroup
        tabIndex={2}
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
        type="request"
        id={`${data.ActiveRequestObj}_2`}
        changetext={(value: string) => sortingBySearch(value)}
      />
    </div>
  )
})
