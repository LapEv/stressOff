import { useContext } from 'react'
import { appData } from 'data/app'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { IUserData } from '../interfaces'
import { CategoriesData } from './CategoriesData'
import { SoundsData } from './SoundsData'
import {
  IMUSICCategories,
  IMUSICS,
  ISOUNDCategories,
  ISOUNDS,
} from 'store/Data/interfaces'

export const UserData = observer(
  ({
    quantitySounds,
    quantityMusics,
    setQuantitySounds,
    setQuantityMusics,
  }: IUserData) => {
    const { data } = useContext(Context)

    const updateCurrentObj = (
      newValue: string | boolean,
      type: string,
      key: string,
      id: string,
    ) => {
      if (key === 'location') {
        newValue = appData.locationArr.find(value => value.name === newValue)
          ?.value as string
      }
      if (key === 'booked') {
        newValue = appData.booleanArr.find(value => value.name === newValue)
          ?.value as boolean
      }

      const _arr = (
        data.ActiveUserObj[type as keyof typeof data.ActiveUserObj] as
          | ISOUNDS[]
          | IMUSICS[]
          | ISOUNDCategories[]
          | IMUSICCategories[]
      ).map(item => (item._id === id ? { ...item, [key]: newValue } : item))
      data.setCurrentUserObj({
        ...data.CurrentUserObj,
        [type]: _arr,
      })
    }

    return (
      <div>
        {data.CurrentUserObj.SOUNDS_Categories ? (
          <CategoriesData
            data={data.CurrentUserObj.SOUNDS_Categories}
            type="SOUNDS_Categories"
            changeValue={updateCurrentObj}
          />
        ) : null}
        {data.CurrentUserObj.MUSICS_Categories ? (
          <CategoriesData
            data={data.CurrentUserObj.MUSICS_Categories}
            type="MUSICS_Categories"
            changeValue={updateCurrentObj}
          />
        ) : null}
        {data.CurrentUserObj.DATA_SOUNDS ? (
          <SoundsData
            data={data.CurrentUserObj.DATA_SOUNDS}
            type="DATA_SOUNDS"
            changeValue={updateCurrentObj}
            quantity={quantitySounds}
            changeQuantity={reset =>
              setQuantitySounds((prev: number) =>
                reset ? appData.userShowQuantity : prev + 10,
              )
            }
            showAll={() =>
              setQuantitySounds(
                data.CurrentUserObj.DATA_SOUNDS?.length as number,
              )
            }
          />
        ) : null}
        {data.CurrentUserObj.DATA_MUSICS ? (
          <SoundsData
            data={data.CurrentUserObj.DATA_MUSICS}
            type="DATA_MUSICS"
            changeValue={updateCurrentObj}
            quantity={quantityMusics}
            changeQuantity={reset =>
              setQuantityMusics((prev: number) =>
                reset ? appData.userShowQuantity : prev + 10,
              )
            }
            showAll={() =>
              setQuantityMusics(
                data.CurrentUserObj.DATA_MUSICS?.length as number,
              )
            }
          />
        ) : null}
      </div>
    )
  },
)
