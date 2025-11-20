import { useRef, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import clSection from './users.module.css'
import { InputGroup, NameSection, SectionControl } from 'components'
import { appData } from 'data/app'
import { emptyUsers } from 'store/data'
import { IUsersModule } from '../interfaces'
import { DropDownData } from './DropDownData'
import { dateToString } from 'utils/dateToString'

export const PersonalData = observer(({ roles }: IUsersModule) => {
  const { data } = useContext(Context)
  const generalRef = useRef<HTMLDivElement>(null)

  const toogleContainer = () => {
    generalRef.current?.classList.toggle(`${clSection.appActiveGeneral}`)
  }

  return (
    <div className={cl.workPanel} style={{ height: 'auto' }}>
      <SectionControl
        nameSection={appData.usersLabel.personalData}
        toogleContainer={toogleContainer}
        active={true}
        style={{
          paddingLeft: 0,
          width: '95%',
          height: 50,
          marginTop: 25,
        }}
      />
      <div className={clSection.personalGeneral} ref={generalRef}>
        <NameSection
          title={dateToString(data.ActiveUserObj.personalData?.createdAt) || ''}
          id={`id: ${
            data.ActiveUserObj._id === emptyUsers[0]._id
              ? 'New user'
              : data.ActiveUserObj._id
          }`}
          style={{ marginTop: 20 }}
        />
        {data.ActiveUserObj._id === emptyUsers[0]._id && (
          <div
            className={cl.panels}
            style={{ height: 'calc(2.5rem + 9.5vh)', minHeight: 0 }}>
            <InputGroup
              tabIndex={3}
              id={'3'}
              type={'user'}
              placeholder={appData.placeholders.required}
              containerwidth={{ width: '50%' }}
              label={appData.usersLabel.login}
              value={''}
              main="login"
            />
            <InputGroup
              tabIndex={4}
              id={'4'}
              type={'user'}
              placeholder={appData.placeholders.required}
              containerwidth={{ width: '50%' }}
              label={appData.usersLabel.password}
              value={''}
              main="password"
            />
          </div>
        )}
        <div
          className={cl.panels}
          style={{ height: 'calc(2.5rem + 9.5vh)', minHeight: 0 }}>
          <InputGroup
            tabIndex={5}
            containerwidth={{ width: '50%' }}
            id={'5'}
            type={'user'}
            label={appData.usersLabel.user}
            value={data.ActiveUserObj.personalData.name ?? ''}
            main="personalData"
            optional="name"
          />
          <InputGroup
            tabIndex={6}
            id={'6'}
            type={'user'}
            containerwidth={{ width: '50%' }}
            label={appData.usersLabel.email}
            value={data.ActiveUserObj.personalData.email ?? ''}
            main="personalData"
            optional="email"
          />
        </div>
        <div
          className={cl.panels}
          style={{ height: 'calc(2.5rem + 9.5vh)', minHeight: 0 }}>
          <DropDownData
            required
            tabIndex={7}
            placeholder={appData.placeholders.required}
            label={appData.usersLabel.role}
            containerwidth={{ width: '50%' }}
            style={{ cursor: 'pointer' }}
            list={roles}
            defaultValue={data.ActiveUserObj.personalData?.roles[0]}
            main="roles"
            type="user"
            id={`${data.ActiveUserObj._id}_7`}
          />
          <DropDownData
            required
            tabIndex={8}
            placeholder={appData.placeholders.required}
            label={appData.usersLabel.type}
            containerwidth={{ width: '50%' }}
            style={{ cursor: 'pointer' }}
            list={appData.typeUsersArr}
            defaultValue={data.ActiveUserObj.personalData?.type}
            main="personalData"
            optional="type"
            type="user"
            id={`${data.ActiveUserObj._id}_8`}
          />
        </div>
      </div>
    </div>
  )
})
