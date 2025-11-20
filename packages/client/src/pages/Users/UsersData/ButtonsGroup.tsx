import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import clUsers from './users.module.css'
import { MODAL } from 'data/modal'
import { deleteItem, saveItem, updateItem } from 'functions'
import { Button } from 'components'
import { appData } from 'data/app'
import { Basket, Save } from 'images'
import { IUserObj } from 'store/Data/interfaces'

export const ButtonsGroup = observer(() => {
  const { data, modal } = useContext(Context)
  const [disabledSave, setDisabledSave] = useState(true)
  const [disabledDelete, setDisabledDelete] = useState(true)

  const pressDelete = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: `${MODAL.modalMessages.deleteUser} "${data.CurrentUserObj.personalData.username}"?`,
      type: MODAL.modalType.delete,
      request: data.CurrentUserObj.globalCategory ?? data,
    })
  }

  const pressSave = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: MODAL.modalMessages.save,
      type: MODAL.modalType.saveUser,
      request: data.CurrentUserObj.globalCategory,
    })
  }

  const prepareToSaveItemObject = (object: IUserObj) => {
    const { login, password } = object
    const { type, roles } = object.personalData
    const { language, theme } = object.appData
    return {
      username: login,
      password,
      type,
      roles,
      language,
      theme,
    }
  }

  useEffect(() => {
    if (!modal.response || !modal.request) return
    if (modal.type === MODAL.modalType.saveUser) {
      data.CurrentUserObj._id
        ? updateItem(modal.request, data.CurrentUserObj, data, modal)
        : saveItem(
            modal.request,
            prepareToSaveItemObject(data.CurrentUserObj),
            data,
            modal,
          )
    }
    if (modal.type === MODAL.modalType.delete) {
      deleteItem(modal.request, data.CurrentUserObj, data, modal)
    }
    modal.setIsVisible(false)
  }, [modal.response])

  useEffect(() => {
    if (data.IsEqualUser) {
      setDisabledSave(true)
      return
    }
    setDisabledSave(false)
  }, [data.IsEqualUser])

  useEffect(() => {
    if (data.CurrentUserObj.personalData.roles.includes('SUPERADMIN')) {
      setDisabledDelete(false)
      return
    }

    if (data.CurrentUserObj._id.length) {
      setDisabledDelete(true)
      return
    }
    setDisabledDelete(false)
  }, [data.CurrentUserObj._id])

  return (
    <div className={clUsers.buttonsPanel}>
      <Button
        style={{
          ...appData.buttons.style,
          boxShadow: 'rgba(0, 0, 0, 0.6) -1px -1px 20px 15px',
          cursor: !disabledDelete ? 'auto' : 'pointer',
        }}
        opacity={!disabledDelete ? 0 : 1}
        visible={!disabledDelete ? false : true}
        disabled={!disabledDelete ? true : false}
        onClick={pressDelete}>
        <div className={cl.buttonImg}>
          <Basket />
        </div>
        {appData.buttons.delete}
      </Button>
      <Button
        style={{
          ...appData.buttons.style,
          boxShadow: 'rgba(0, 0, 0, 0.6) -1px -1px 20px 15px',
          cursor: disabledSave ? 'auto' : 'pointer',
        }}
        opacity={disabledSave ? 0 : 1}
        visible={disabledSave ? false : true}
        disabled={disabledSave ? true : false}
        onClick={pressSave}>
        <div className={cl.buttonImg} tabIndex={7}>
          <Save
            style={{
              width: '90%',
              height: '100%',
            }}
          />
        </div>
        {appData.buttons.save}
      </Button>
    </div>
  )
})
