import { appData } from 'data/app'
import { memo } from 'react'
import { DropDownData } from './DropDownData'
import { ICategoryList } from './interfaces'

export const CategoryList = memo(({ type }: ICategoryList) => {
  return (
    <DropDownData
      required
      tabIndex={2}
      placeholder={appData.placeholders.required}
      label={appData.adminLabel.category}
      containerwidth={{ width: '50%' }}
      type={type}
      main="category"
      optional="RUS"
      id={'CategoryList_2'}
    />
  )
})
