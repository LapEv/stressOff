import { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import Scrollbar from 'react-scrollbars-custom'
import { updateItem } from 'functions'
import { appData } from 'data/app'
import { NameSection } from 'components'
import { DateToString } from 'utils/dateToString'

export const MessagesModule = observer(() => {
  const { data, modal } = useContext(Context)
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  useEffect(() => {
    setTitle(data.ActiveMessageObj.title)
    setBody(data.ActiveMessageObj.body)
    const { unread } = data.ActiveMessageObj
    if (
      unread &&
      data.ActiveMessageObj.globalCategory === appData.globalCategory.MESSAGES
    ) {
      updateItem(
        appData.updateUnreadInMessage,
        { ...data.ActiveMessageObj, unread: false },
        data,
        modal,
      )
      return
    }
    data.setCurrentMessageObj(data.ActiveMessageObj)
  }, [data.ActiveMessageObj])

  return (
    <div
      className={cl.workPanel}
      style={{ width: '100%', alignItems: 'flex-start' }}>
      <NameSection
        title={DateToString(data.ActiveMessageObj.date)}
        id={`№ ${data.ActiveMessageObj.id}`}
        style={{ marginTop: 20 }}
      />
      <Scrollbar
        style={{ width: '100%' }}
        className={cl.panelsMessagesContainer}>
        <div className={cl.panelsMessages}>
          <div className={cl.messagesTitle}>
            <b>{title}</b>
          </div>
          <div style={{ marginTop: 20, opacity: 0.9, whiteSpace: 'pre-wrap' }}>
            {body}
          </div>
        </div>
      </Scrollbar>
    </div>
  )
})
