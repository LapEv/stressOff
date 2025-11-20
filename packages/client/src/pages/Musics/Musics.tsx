import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { usePrepareMenuSoundData } from '../../hooks/usePrepareMenuData'
import { Context } from '../../main'
import { MenuBar, SoundsModule } from 'components'

export const Musics = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuSoundData(data.Musics)

  useEffect(() => {
    data.setActiveWindow('Sounds')
  }, [])

  return (
    <div className={cl.general}>
      <MenuBar items={items} type={'musics'} />
      <SoundsModule type={'Musics'} />
    </div>
  )
})
