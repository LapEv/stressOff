import { useRef } from 'react'
import cl from './users.module.css'
import { appData } from 'data/app'
import { Button, InputGroup, SectionControl } from 'components'
import { ISoundsDataUsers } from '../interfaces'
import { DropDownData } from './DropDownData'

export const SoundsData = ({
  data,
  type,
  changeValue,
  quantity,
  changeQuantity,
  showAll,
}: ISoundsDataUsers) => {
  const generalRef = useRef<HTMLDivElement>(null)

  const toogleContainer = () => {
    generalRef.current?.classList.toggle(`${cl.activeGeneral}`)
    if (quantity > appData.userShowQuantity) {
      changeQuantity(true)
    }
  }

  return (
    <div className={cl.workPanel} style={{ height: 'auto' }}>
      <SectionControl
        nameSection={
          type === 'DATA_SOUNDS'
            ? appData.usersLabel.sounds
            : appData.usersLabel.musics
        }
        active={true}
        toogleContainer={toogleContainer}
        style={{
          paddingLeft: 0,
          width: '95%',
          height: 50,
        }}
      />
      <div className={cl.general} ref={generalRef}>
        {data.map((value, index) => {
          return (
            index < quantity && (
              <div
                className={cl.panels2}
                style={{
                  height: 'calc(2.5rem + 9.5vh)',
                  flexDirection: 'column',
                }}
                key={`${value.category}${index}`}>
                <div className={cl.soundsContainer}>
                  <InputGroup
                    disabled
                    containerwidth={{ width: '50%' }}
                    label={appData.usersLabel.name}
                    value={value.name || ''}
                    main="noData"
                    type="users"
                    id={`${value._id}_5`}
                  />
                  <InputGroup
                    disabled
                    containerwidth={{ width: '50%' }}
                    label={appData.usersLabel.id}
                    value={value.id || ''}
                    main="noData"
                    type="users"
                    id={`${value._id}_6`}
                  />
                </div>
                <div className={cl.soundsContainer}>
                  <InputGroup
                    containerwidth={{ width: '50%' }}
                    label={appData.usersLabel.image}
                    value={value.imgStorage || ''}
                    main="noData"
                    type="users"
                    id={`${value._id}_7`}
                    changetext={text =>
                      changeValue(text, type, 'imgStorage', value._id)
                    }
                  />
                  <InputGroup
                    containerwidth={{ width: '50%' }}
                    label={appData.usersLabel.sound}
                    value={value.storage || ''}
                    main="noData"
                    type="users"
                    id={`${value._id}_8`}
                    changetext={text =>
                      changeValue(text, type, 'storage', value._id)
                    }
                  />
                </div>
                <div className={cl.soundsContainer} style={{ minHeight: 200 }}>
                  <DropDownData
                    required
                    placeholder={appData.placeholders.required}
                    label={appData.usersLabel.location}
                    containerwidth={{ width: '50%' }}
                    style={{ cursor: 'pointer' }}
                    list={appData.locationArr}
                    main="custom"
                    type="users"
                    id={`${value._id}_9`}
                    defaultValue={
                      appData.locationArr.find(
                        item => item.value === value.location,
                      )?.name || ''
                    }
                    changeValue={(text: string) =>
                      changeValue(text, type, 'location', value._id)
                    }
                  />
                  <DropDownData
                    required
                    placeholder={appData.placeholders.required}
                    label={appData.usersLabel.booked}
                    style={{ cursor: 'pointer' }}
                    containerwidth={{ width: '50%' }}
                    list={appData.booleanArr}
                    main="custom"
                    type="users"
                    id={`${value._id}_10`}
                    defaultValue={
                      value.booked
                        ? appData.booleanArr[0].name
                        : appData.booleanArr[1].name
                    }
                    changeValue={(text: string) =>
                      changeValue(text, type, 'booked', value._id)
                    }
                  />
                </div>
              </div>
            )
          )
        })}
        <div className={cl.button}>
          <Button
            style={{
              ...appData.buttons.style,
            }}
            onClick={() => changeQuantity(false)}>
            {appData.buttons.showMore}
          </Button>
          <Button
            style={{
              ...appData.buttons.style,
            }}
            onClick={showAll}>
            {appData.buttons.showAll}
          </Button>
        </div>
      </div>
    </div>
  )
}
