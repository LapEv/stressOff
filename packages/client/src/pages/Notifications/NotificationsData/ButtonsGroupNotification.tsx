import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import { MODAL } from 'data/modal'
import { Button } from 'components'
import { appData } from 'data/app'
import { Save, Send } from 'images'

export const ButtonsGroupNotification = observer(() => {
  const { data, modal } = useContext(Context)
  const [disabledSave, setDisabledSave] = useState(true)
  const [disabledDelete, setDisabledDelete] = useState(true)

  const pressSend = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: `${MODAL.modalMessages.sendNotification} "${data.CurrentNotificationObj.title?.RUS}"?`,
      type: MODAL.modalType.sendNotification,
      request: data.CurrentNotificationObj.globalCategory,
    })
  }

  const pressSave = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: MODAL.modalMessages.save,
      type: MODAL.modalType.saveNotification,
      request: data.CurrentNotificationObj.globalCategory,
    })
  }

  useEffect(() => {
    setDisabledDelete(data.ActiveNotificationObj._id ? false : true)
  }, [data.ActiveNotificationObj])

  useEffect(() => {
    data.IsEqualNotification ? setDisabledSave(true) : setDisabledSave(false)
  }, [data.IsEqualNotification])

  return (
    <div
      className={cl.buttonsPanel}
      style={{
        height: '5%',
        justifyContent: data.CurrentNotificationObj._id
          ? 'space-between'
          : 'flex-end',
      }}>
      {data.CurrentNotificationObj._id && (
        <Button
          style={{
            opacity: disabledDelete ? 0.6 : 1,
            width: 150,
            ...appData.buttons.style,
          }}
          onClick={pressSend}
          disabled={disabledDelete}>
          <div className={cl.buttonImg} tabIndex={9}>
            <Send style={{ width: '80%', height: '100%' }} />
          </div>
          {appData.buttons.send}
        </Button>
      )}

      <Button
        style={{
          opacity: disabledSave ? 0.6 : 1,
          ...appData.buttons.style,
        }}
        onClick={pressSave}
        disabled={disabledSave}>
        <div className={cl.buttonImg} tabIndex={10}>
          <Save
            style={{
              width: data.CurrentNotificationObj._id ? '95%' : '80%',
              height: '100%',
            }}
          />
        </div>
        {data.CurrentNotificationObj._id
          ? appData.buttons.save
          : appData.buttons.create}
      </Button>
    </div>
  )
})
