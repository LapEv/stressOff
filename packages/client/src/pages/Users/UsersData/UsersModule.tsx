import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import Scrollbar from 'react-scrollbars-custom'
import cl from '../../General.module.css'
import { emptyUsers } from 'store/data'
import { appData } from 'data/app'
import { IUsersModule } from '../interfaces'
import { FilterData } from './FilterData'
import { PersonalData } from './PersonalData'
import { AppData } from './AppData'
import { UserData } from './UserData'
import { ButtonsGroup } from './ButtonsGroup'
import { IUserObj } from 'store/Data/interfaces'

export const UsersModule = observer(({ roles }: IUsersModule) => {
  const { data } = useContext(Context)
  const [quantitySounds, setQuantitySounds] = useState<
    number | ((data: number) => void)
  >(appData.userShowQuantity)
  const [quantityMusics, setQuantityMusics] = useState<
    number | ((data: number) => void)
  >(appData.userShowQuantity)

  useEffect(() => {
    const activeObj =
      data.ActiveUserObj._id === emptyUsers[0]._id
        ? {
            ...data.ActiveUserObj,
            login: '',
            password: '',
          }
        : (data.ActiveUserObj as IUserObj)
    data.setCurrentUserObj(activeObj)
    setQuantitySounds(appData.userShowQuantity)
    setQuantityMusics(appData.userShowQuantity)
  }, [data.ActiveUserObj])

  return (
    <div className={cl.generalInfo} style={{ minWidth: 500, paddingTop: 20 }}>
      <Scrollbar className={cl.scrollbarInfo}>
        <FilterData />
        <PersonalData roles={roles} />
        <AppData />
        {data.ActiveUserObj?._id !== emptyUsers[0]._id && (
          <UserData
            quantitySounds={quantitySounds as number}
            quantityMusics={quantityMusics as number}
            setQuantitySounds={setQuantitySounds}
            setQuantityMusics={setQuantityMusics}
          />
        )}
      </Scrollbar>
      <ButtonsGroup />
    </div>
  )
})
