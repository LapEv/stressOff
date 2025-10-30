import { useMemo } from 'react'
import { appData } from 'data/app'
import { emptyUsers } from 'store/data'
import { onlyDateToString } from 'utils/dateToString'
import {
  IMESSAGES,
  INOTIFICATIONS,
  IREQUESTS,
  ISOUNDCategories,
  ISOUNDS,
  IUSERS,
} from 'store/Data/interfaces'
import { stableSort } from 'utils/stableSort'
import { IMenuUsersData } from './interfaces'

export const usePrepareMenuSoundData = (data: ISOUNDS[]) => {
  const prepared = useMemo(() => {
    const prepareArr = data
      .map(value => {
        return {
          category: value.category.RUS,
          item: value.title.RUS,
          _id: value._id,
        }
      })
      .slice()
    return stableSort(prepareArr, () => 0)
  }, [data])
  return prepared
}

export const usePrepareMenuCategoriesData = (data: ISOUNDCategories[]) => {
  const prepared = useMemo(() => {
    const prepareArr = data
      .map(value => {
        return {
          category: value.globalCategory.split('_')[0],
          item: value.title.RUS,
          _id: value._id,
        }
      })
      .slice()
    return stableSort(prepareArr, () => 0)
  }, [data])
  return prepared
}

export const usePrepareMenuUsersData = (
  data: IUSERS[],
  findValue: string,
  sortedValue: string,
) => {
  const prepared = useMemo(() => {
    const mapped = data
      .map((value, index) => {
        return {
          category: '',
          item: value.personalData.username,
          type: value.personalData.type,
          roles: value.personalData.roles,
          id: index.toString(),
          _id: value._id,
        }
      })
      .slice()
      .sort((a: IMenuUsersData, b: IMenuUsersData) =>
        a.id === '0' ? -1 : b.id === '0' ? 1 : a.id.localeCompare(b.id),
      )
    const findedUsers = mapped.filter(
      (value, index) =>
        value.item.toLowerCase().includes(findValue.toLowerCase()) ||
        index === 0,
    )
    const sort = appData.sortStatusUsersArr.find(
      item => item.name === sortedValue,
    )?.value
    if (sort === 'Все' || sort === 'all') return findedUsers
    return findedUsers.filter(
      value =>
        value.type.includes(sort as string) ||
        value.roles.includes(sort as string) ||
        value._id === emptyUsers[0]._id,
    )
  }, [data, findValue, sortedValue])
  return prepared
}

export const usePrepareMenuNotificationsData = (data: INOTIFICATIONS[]) => {
  const prepared = useMemo(() => {
    return data
      .map((value, index) => {
        return {
          category: '',
          item: value.name,
          id: index.toString(),
          _id: value._id,
        }
      })
      .slice()
      .sort((a, b) =>
        a.id === '0' ? -1 : b.id === '0' ? 1 : a.id.localeCompare(b.id),
      )
  }, [data])
  return prepared
}

export const usePrepareMenuRequestsData = (
  data: IREQUESTS[],
  findValue: string,
  sortedValue: string,
) => {
  const prepared = useMemo(() => {
    const prepareArr = data
      .map(value => {
        return {
          category: '',
          status: value.status,
          item: value.number,
          email: value.email,
          userID: value.userID,
          unread: value.unread,
          _id: value._id,
        }
      })
      .slice()
    const mapped = stableSort(prepareArr, () => 0)
    const findedUsers = mapped.filter(
      value =>
        value.item.toLowerCase().includes(findValue.toLowerCase()) ||
        value.userID.toLowerCase().includes(findValue.toLowerCase()) ||
        value.email.toLowerCase().includes(findValue.toLowerCase()),
    )
    const checkEmptyUsers = findedUsers.length > 0 ? findedUsers : [mapped[0]]
    if (sortedValue === 'Все' || sortedValue === 'all') return checkEmptyUsers
    return checkEmptyUsers.filter(value => value.status.includes(sortedValue))
  }, [data, findValue, sortedValue])
  return prepared
}

export const usePrepareMenuMessagesData = (data: IMESSAGES[]) => {
  const prepared = useMemo(() => {
    return data
      .map((value, index) => {
        return {
          category: onlyDateToString(value.date),
          item: value.title,
          id: index.toString(),
          unread: value.unread,
          _id: value._id,
        }
      })
      .slice()
      .sort((a, b) =>
        a.id === '0' ? -1 : b.id === '0' ? 1 : a.id.localeCompare(b.id),
      )
  }, [data])
  return prepared
}
