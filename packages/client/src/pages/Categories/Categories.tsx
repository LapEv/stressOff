import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { Context } from '../../main'
import { usePrepareMenuCategoriesData } from 'hooks'
import { MenuBar } from 'components'
import { CategoriesModule } from './CategoriesData/CategoriesModule'

export const Categories = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuCategoriesData([
    ...data.SoundCategories,
    ...data.MusicCategories,
  ])

  useEffect(() => {
    data.setActiveWindow('Categories')
  }, [])

  return (
    <div className={cl.general}>
      <MenuBar items={items} type={'category'} />
      <CategoriesModule />
    </div>
  )
})
