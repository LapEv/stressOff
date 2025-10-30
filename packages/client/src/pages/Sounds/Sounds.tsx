import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../General.module.css'
import { usePrepareMenuSoundData } from '../../hooks/usePrepareMenuData'
import { Context } from '../../main'
import { Menu } from 'components'

export const Sounds = observer(() => {
  const { data } = useContext(Context)
  const items = usePrepareMenuSoundData(data.Sounds)

  return (
    <div className={cl.general}>
      {/* <Menu items={items} />
      <SoundsModule type={'Sounds'} /> */}
    </div>
  )
})
