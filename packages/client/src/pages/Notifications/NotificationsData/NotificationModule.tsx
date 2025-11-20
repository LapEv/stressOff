import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import Scrollbar from 'react-scrollbars-custom'
import { InputGroup, NameSection, TextAreaGroupNotification } from 'components'
import { DateToString } from 'utils/dateToString'
import { appData } from 'data/app'
import { CheckedModule } from './CheckedModule'
import { ButtonsGroupNotification } from './ButtonsGroupNotification'

export const NotificationModule = observer(() => {
  const { data } = useContext(Context)

  useEffect(() => {
    data.setCurrentNotificationObj(
      data.ActiveNotificationObj._id
        ? data.ActiveNotificationObj
        : { ...data.ActiveNotificationObj, date: new Date() },
    )
  }, [data.ActiveNotificationObj])

  return (
    <Scrollbar style={{ width: '100%' }}>
      <div className={cl.workPanel} style={{ width: '100%' }}>
        <NameSection
          title={DateToString(data.ActiveNotificationObj.date)}
          id={`id: ${data.ActiveNotificationObj.id}`}
        />
        <div className={cl.panels} style={{ height: '15%' }}>
          <InputGroup
            tabIndex={1}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.notificationLabel.inAppName}
            main="name"
            type="notifications"
            id={`${data.ActiveNotificationObj._id}_1`}
            value=""
          />
        </div>
        <div className={cl.panels} style={{ height: '15%' }}>
          <InputGroup
            tabIndex={2}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.notificationLabel.topicRus}
            main="title"
            optional="RUS"
            type="notifications"
            id={`${data.ActiveNotificationObj._id}_2`}
            value=""
          />
          <InputGroup
            tabIndex={3}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.notificationLabel.topicEng}
            main="title"
            optional="ENG"
            type="notifications"
            id={`${data.ActiveNotificationObj._id}_3`}
            value=""
          />
        </div>
        <div className={cl.panels} style={{ height: '25%' }}>
          <TextAreaGroupNotification
            tabIndex={4}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            maxLength={500}
            style={{ resize: 'none', height: 'calc(7rem + 2.5vh)' }}
            label={appData.notificationLabel.descriptionRus}
            multiline="true"
            main="body"
            optional="RUS"
            id={`${data.ActiveNotificationObj._id}_4`}
            value=""
          />
          <TextAreaGroupNotification
            tabIndex={5}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.notificationLabel.descriptionEng}
            maxLength={250}
            style={{ resize: 'none', height: 'calc(7rem + 2.5vh)' }}
            multiline="true"
            main="body"
            optional="ENG"
            id={`${data.ActiveNotificationObj._id}_5`}
            value=""
          />
        </div>
        <CheckedModule />
        <ButtonsGroupNotification />
      </div>
    </Scrollbar>
  )
})
