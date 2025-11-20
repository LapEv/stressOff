import { IREQUESTS } from 'store/Data/interfaces'

export const getUniqueBy = (arr: IREQUESTS[], key: string) => {
  if (!arr || !key) return
  const set = new Set()
  return arr.filter(
    o =>
      !set.has(o[key as keyof typeof o]) && set.add(o[key as keyof typeof o]),
  )
}
