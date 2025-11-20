import { useRef } from 'react'
import cl from './users.module.css'
import { InputGroup, SectionControl } from 'components'
import { appData } from 'data/app'
import { ICategoriesDataUsers } from '../interfaces'

export const CategoriesData = ({
  data,
  type,
  changeValue,
}: ICategoriesDataUsers) => {
  const generalRef = useRef<HTMLDivElement>(null)

  const toogleContainer = () => {
    generalRef.current?.classList.toggle(`${cl.activeGeneral}`)
  }

  return (
    <div className={cl.workPanel} style={{ height: 'auto' }}>
      <SectionControl
        nameSection={
          type === 'SOUNDS_Categories'
            ? appData.usersLabel.soundCategories
            : appData.usersLabel.musicCategories
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
        {data.map((value, index) => (
          <div
            className={cl.panels}
            style={{
              height: 'calc(2.5rem + 9.5vh)',
              flexDirection: 'column',
            }}
            key={`${value.category}${index}`}>
            <div style={{ display: 'flex', width: '100%' }}>
              <InputGroup
                disabled
                tabIndex={
                  type === 'SOUNDS_Categories'
                    ? index + 11
                    : index + 11 + data.length + 1
                }
                id={`${value._id}_1`}
                containerwidth={{ width: '50%' }}
                label={appData.usersLabel.category}
                value={value.category || ''}
                main="noData"
                type="users"
              />
              <InputGroup
                disabled
                tabIndex={
                  type === 'SOUNDS_Categories'
                    ? index + 12
                    : index + 12 + data.length + 1
                }
                id={`${value._id}_2`}
                containerwidth={{ width: '50%' }}
                label={appData.usersLabel.id}
                value={value.id || ''}
                main="noData"
                type="users"
              />
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              <InputGroup
                tabIndex={
                  type === 'SOUNDS_Categories'
                    ? index + 13
                    : index + 13 + data.length + 1
                }
                id={`${value._id}_3`}
                containerwidth={{ width: '50%' }}
                label={appData.usersLabel.img}
                value={value.imgStorage || ''}
                main="noData"
                type="users"
                changetext={text =>
                  changeValue(text, type, 'imgStorage', value._id)
                }
              />
              <InputGroup
                tabIndex={
                  type === 'SOUNDS_Categories'
                    ? index + 14
                    : index + 14 + data.length + 1
                }
                id={`${value._id}_4`}
                containerwidth={{ width: '50%' }}
                label={appData.usersLabel.img_lt}
                value={value.imgStorage_lt || ''}
                main="noData"
                type="users"
                changetext={text =>
                  changeValue(text, type, 'imgStorage_lt', value._id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
