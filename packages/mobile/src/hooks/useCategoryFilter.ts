import store from '@/store'
import { useICategoryFilter } from './interfaces'
import { ILocalizationOptions } from '@/localization/interfaces'

export const useCategoryFilter = ({ data, filter }: useICategoryFilter) => {
  const language = (store.getState().language as ILocalizationOptions)
    .nameLanguage
  return data.filter(
    ({ category }) => JSON.parse(category)[language] === filter,
  )
}
