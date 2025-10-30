import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { Context } from '../../main'
import { usePrepareMenuCategoriesData } from 'hooks'
import { CategoriesModule, MenuBar } from 'components'

export const Categories = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuCategoriesData([
    ...data.SoundCategories,
    ...data.MusicCategories,
  ])

  return (
    <div className={cl.general}>
      <MenuBar items={items} />
      <CategoriesModule />
    </div>
  )
})
