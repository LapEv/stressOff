import { useMemo } from 'react'
import { ISOUNDCategories, ISOUNDS } from 'store/Data/interfaces'
import { INewFilteredObj } from './interfaces'

const newObj = (
  value: ISOUNDS,
  key: string,
  newValue: string,
  specialKey: string,
  index: number,
) => {
  const obj = { [key]: value[newValue as keyof typeof value] }
  return {
    [key]: obj[specialKey as keyof typeof obj],
    id: index,
  }
}

const newObjCat = (
  value: ISOUNDCategories,
  key: string,
  newValue: string,
  specialKey: string,
  index: number,
) => {
  const obj = value[newValue as keyof typeof value]
  return {
    [key]: obj[specialKey as keyof typeof obj],
    id: index,
  }
}

export const useMapNewObj = (
  data: ISOUNDS[],
  key: string,
  newValue: string,
  specialKey: string,
) => {
  const newArr = useMemo(() => {
    return data
      .map((value, index) =>
        !specialKey
          ? {
              [key]: value[newValue as keyof typeof value],
              id: index,
            }
          : newObj(value, key, newValue, specialKey, index),
      )
      .filter(value => value[key] !== '')
  }, [data, key, newValue, specialKey])
  return newArr
}

export const useMapNewObjCat = (
  data: ISOUNDCategories[],
  key: string,
  newValue: string,
  specialKey: string,
) => {
  const newArr = useMemo(() => {
    return data
      .map((value, index) =>
        !specialKey
          ? {
              [key]: value[newValue as keyof typeof value],
              id: index,
            }
          : newObjCat(value, key, newValue, specialKey, index),
      )
      .filter(value => value[key] !== '')
  }, [data, key, newValue, specialKey])
  return newArr
}

export const useNewFilteredObj = (
  data: ISOUNDS[],
  name: string,
  key: string,
  newValue: string,
  specialKey: string,
) => {
  const mappedData = useMapNewObj(data, key, newValue, specialKey)
  const filtered = useMemo(() => {
    return mappedData.filter(
      (value: INewFilteredObj) =>
        (value[key as keyof typeof value] as string)
          .toLowerCase()
          .includes(name?.toLowerCase()) || !name,
    )
  }, [data, name, key, newValue, specialKey])
  return filtered
}

export const useNewFilteredObjCat = (
  data: ISOUNDCategories[],
  name: string,
  key: string,
  newValue: string,
  specialKey: string,
) => {
  const mappedData = useMapNewObjCat(data, key, newValue, specialKey)
  const filtered = useMemo(() => {
    return mappedData.filter(
      (value: INewFilteredObj) =>
        (value[key as keyof typeof value] as string)
          .toLowerCase()
          .includes(name?.toLowerCase()) || !name,
    )
  }, [data, name, key, newValue, specialKey])
  return filtered
}

export const useNewObj = (data: string[], key: string) => {
  const newArr = useMemo(() => {
    return data
      .map((value, index) => {
        return {
          [key]: value,
          id: index,
        }
      })
      .filter(value => value[key] !== '')
  }, [data, key])
  return newArr
}

export const useFilterList = (
  data: string[],
  includes: string[],
  notIncludes: string[],
  name: string,
  key: string,
) => {
  const filterData = useMemo(() => {
    return data
      .filter(
        value =>
          includes.every(v => value.includes(v)) &&
          !notIncludes.some(v => value.includes(v)),
      )
      .map(value => value.split('\\')[value.split('\\').length - 1])
      .sort()
  }, [data])
  const mappedData = useNewObj(filterData, key)
  const filtered = useMemo(() => {
    return mappedData.filter(
      (value: INewFilteredObj) =>
        (value[key] as string).toLowerCase().includes(name?.toLowerCase()) ||
        !name,
    )
  }, [mappedData, key, name])
  return filtered
}
