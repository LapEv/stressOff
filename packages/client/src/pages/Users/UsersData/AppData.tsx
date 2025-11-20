import { useRef, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import clSection from './users.module.css'
import { SectionControl } from 'components'
import { appData } from 'data/app'
import { DropDownData } from './DropDownData'

export const AppData = observer(() => {
  const { data } = useContext(Context)
  const generalRef = useRef<HTMLDivElement>(null)

  const toogleContainer = () => {
    generalRef.current?.classList.toggle(`${clSection.appActiveGeneral}`)
  }

  return (
    <div className={cl.workPanel} style={{ height: 'auto' }}>
      <SectionControl
        nameSection={appData.usersLabel.appData}
        toogleContainer={toogleContainer}
        active={true}
        style={{
          paddingLeft: 0,
          width: '95%',
          height: 50,
        }}
      />
      <div
        className={clSection.appGeneral}
        ref={generalRef}
        style={{
          width: '100%',
          alignItems: 'flex-start',
          height: 'auto',
          boxShadow: '0 0 0px',
          margin: 0,
          padding: 0,
        }}>
        <div className={cl.panels} style={{ height: 'calc(2.5rem + 9.5vh)' }}>
          <DropDownData
            required
            tabIndex={9}
            placeholder={appData.placeholders.required}
            label={appData.usersLabel.language}
            containerwidth={{ width: '50%' }}
            style={{ cursor: 'pointer' }}
            list={appData.languageArr}
            defaultValue={data.ActiveUserObj.appData?.language}
            main="appData"
            optional="language"
            type="user"
            id={`${data.ActiveUserObj._id}_9`}
          />
          <DropDownData
            required
            tabIndex={10}
            placeholder={appData.placeholders.required}
            label={appData.usersLabel.theme}
            containerwidth={{ width: '50%' }}
            style={{ cursor: 'pointer' }}
            list={appData.themeArr}
            defaultValue={data.ActiveUserObj.appData?.theme}
            main="appData"
            optional="theme"
            type="user"
            id={`${data.ActiveUserObj._id}_10`}
          />
        </div>
      </div>
    </div>
  )
})
