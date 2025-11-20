import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import { MODAL } from 'data/modal'
import { saveItem, updateItem } from 'functions'
import { appData } from 'data/app'
import { CheckBox } from 'components'

export const CheckedModule = observer(() => {
  const { data, modal } = useContext(Context)

  useEffect(() => {
    if (!modal.response || !modal.request) return
    if (modal.type === MODAL.modalType.saveNotification) {
      data.CurrentNotificationObj._id
        ? updateItem(modal.request, data.CurrentNotificationObj, data, modal)
        : saveItem(modal.request, data.CurrentNotificationObj, data, modal)
    }
    if (modal.type === MODAL.modalType.sendNotification) {
      // send Notification
      console.log('send Notification')
    }
    modal.setIsVisible(false)
  }, [modal.response])

  const changeObj = (value: boolean, obj: string) => {
    data.setCurrentNotificationObj({
      ...data.CurrentNotificationObj,
      [obj]: value,
    })
  }

  return (
    <div
      className={cl.panels}
      style={{ height: '20%', flexDirection: 'column' }}>
      <CheckBox
        containerwidth={{ width: '100%', height: 35 }}
        tabIndex={6}
        value={data.CurrentObj.push as boolean}
        name="checkedPush"
        onChangeChecked={(value: boolean) => changeObj(value, 'push')}
        label={appData.notificationLabel.checkbox.push}
      />
      <CheckBox
        containerwidth={{ width: '100%', height: 35 }}
        tabIndex={7}
        value={data.CurrentNotificationObj.anonymousUsers}
        name="checkedFree"
        onChangeChecked={(value: boolean) => changeObj(value, 'anonymousUsers')}
        label={appData.notificationLabel.checkbox.free}
      />

      <CheckBox
        containerwidth={{ width: '100%', height: 35 }}
        tabIndex={8}
        value={data.CurrentNotificationObj.premiumUsers}
        name="checkedPremium"
        onChangeChecked={(value: boolean) => changeObj(value, 'premiumUsers')}
        label={appData.notificationLabel.checkbox.premium}
      />
    </div>
  )
})
