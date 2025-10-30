import { useMemo } from 'react'
import { appData } from 'data/app'
import { ISOUNDS, ISOUNDCategories, IUSERS } from 'store/Data/interfaces'

export const useCategoriesDataInfo = (
  mainData: ISOUNDS[],
  dataFilter: ISOUNDCategories[],
) => {
  const filtered = useMemo(() => {
    if (!dataFilter.length) return []
    return dataFilter
      .map((value, index) => {
        if (value.id !== '0') {
          const category = mainData.filter(item => {
            return (
              item.category.ENG.toLocaleLowerCase() ===
              value.category.toLocaleLowerCase()
            )
          }).length
          return { id: index, label: value.title.RUS, count: category }
        }
      })
      .filter(value => value)
  }, [mainData, dataFilter])
  return filtered
}

interface IFilter {
  label: string
  folder: string
}

export const useFilesDataInfo = (mainData: string[], dataFilter: IFilter[]) => {
  const filtered = useMemo(() => {
    return dataFilter
      .map((value, index) => {
        const count = mainData.filter(item =>
          item.includes(value.folder),
        ).length
        return { id: index, label: value.label, count: count }
      })
      .filter(value => value)
  }, [mainData, dataFilter])
  return filtered
}

export const useUsersTypes = (data: IUSERS[]) => {
  const filtered = useMemo(() => {
    if (!data.length) return []
    return data.reduce((value, item) => {
      return {
        ...value,
        [item.personalData['type']]:
          value[item.personalData['type'] as keyof typeof value] && item._id
            ? value[item.personalData['type'] as keyof typeof value] + 1
            : item._id
              ? 1
              : 0,
      }
    }, {})
  }, [data])
  return filtered
}

export const useUsersRoles = (data: IUSERS[]) => {
  const filtered = useMemo(() => {
    if (!data.length) return []
    return data.reduce((value, item) => {
      return {
        ...value,
        [appData.rolesArr[0].value]:
          item.personalData['roles'].includes(appData.rolesArr[0].value) &&
          item._id
            ? value[appData.rolesArr[0].value as keyof typeof value] + 1
            : item._id
              ? 1
              : 0,
        [appData.rolesArr[1].value]:
          item.personalData['roles'].includes(appData.rolesArr[1].value) &&
          item._id
            ? value[appData.rolesArr[1].value as keyof typeof value] + 1
            : item._id
              ? 1
              : 0,
        [appData.rolesArr[2].value]:
          item.personalData['roles'].includes(appData.rolesArr[2].value) &&
          item._id
            ? value[appData.rolesArr[2].value as keyof typeof value] + 1
            : item._id
              ? 1
              : 0,
      }
    }, {})
  }, [data])
  return filtered
}
