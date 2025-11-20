import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import Scrollbar from 'react-scrollbars-custom'
import { appData } from 'data/app'
import { updateItem } from 'functions'
import { DateToString } from 'utils/dateToString'
import { RequestHistory } from './RequestHistory'
import { RequestSort } from './RequestSort'
import { InputGroup, NameSection } from 'components'
import { RequestDropDownData } from './RequestDropDownData'
import RequestTextData from './RequestTextData'
import { RequestButtons } from './RequestButtons'

export const RequestsModule = observer(() => {
  const { data, modal } = useContext(Context)

  useEffect(() => {
    const { unread, status } = data.ActiveRequestObj
    if (unread && status === appData.statusRequestArr[0].value) {
      updateItem(
        appData.updateUnreadInRequest,
        { ...data.ActiveRequestObj, unread: false },
        data,
        modal,
      )
      return
    }
    data.setCurrentRequestObj(data.ActiveRequestObj)
  }, [data.ActiveRequestObj])

  return (
    <Scrollbar style={{ width: '100%' }}>
      <div
        className={cl.workPanel}
        style={{ width: '100%', alignItems: 'flex-start' }}>
        <RequestHistory
          visible={modal.modalHistory}
          history={data.ActiveRequestObj.history}
          setModalHistory={() => modal.setModalHistory(false)}
        />
        <RequestSort />
        <div className={cl.line}></div>
        <NameSection
          title={`№ ${data.ActiveRequestObj.number}`}
          id={DateToString(data.ActiveRequestObj.date)}
          style={{ marginTop: 20 }}
        />
        <div className={cl.panels} style={{ height: '15%' }}>
          <RequestDropDownData
            required
            tabIndex={3}
            placeholder={appData.placeholders.required}
            label={appData.requestLabel.status}
            containerwidth={{ width: '50%' }}
            style={{ cursor: 'pointer' }}
            list={appData.statusRequestArr}
            defaultValue={
              appData.statusRequestArr.find(
                item => item.value === data.ActiveRequestObj.status,
              )?.name || ''
            }
            main="status"
          />
          <InputGroup
            tabIndex={4}
            id={`${data.ActiveRequestObj}_4`}
            type="request"
            disabled
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.requestLabel.topic}
            value={data.ActiveRequestObj.topic || ''}
            main="topic"
          />
        </div>
        <div className={cl.panels} style={{ height: '15%' }}>
          <InputGroup
            tabIndex={5}
            id={`${data.ActiveRequestObj}_5`}
            type="request"
            disabled
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.requestLabel.user}
            value={data.ActiveRequestObj.name || ''}
            main="name"
          />
          <InputGroup
            tabIndex={6}
            id={`${data.ActiveRequestObj}_6`}
            type="request"
            disabled
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.requestLabel.email}
            value={data.ActiveRequestObj.email || ''}
            main="email"
          />
        </div>
        <RequestTextData />
        <RequestButtons />
      </div>
    </Scrollbar>
  )
})
