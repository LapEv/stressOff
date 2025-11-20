import { useContext, useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import { MODAL } from 'data/modal'
import { appData } from 'data/app'
import { updateItem } from 'functions'
import { Button } from 'components'
import { Save, History } from 'images'

export const RequestButtons = observer(() => {
  const { data, modal, user } = useContext(Context)
  const [disabledSave, setDisabledSave] = useState(true)

  const pressSave = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: MODAL.modalMessages.save,
      type: MODAL.modalType.saveRequest,
      request: data.CurrentRequestObj.globalCategory,
    })
  }

  const openHistory = () => {
    modal.setModalHistory(true)
  }

  useEffect(() => {
    if (data.IsEqualRequest) {
      setDisabledSave(true)
      return
    }
    if (
      data.CurrentRequestObj.status === appData.statusRequestArr[0].value ||
      data.CurrentRequestObj.status === appData.statusRequestArr[1].value
    ) {
      setDisabledSave(false)
      return
    }
    data.CurrentRequestObj.solution?.length >
      appData.minlengthSolutionRequest &&
    data.CurrentRequestObj.solution?.length < appData.maxlengthSolutionRequest
      ? setDisabledSave(false)
      : setDisabledSave(true)
  }, [data.IsEqualRequest])

  useEffect(() => {
    if (!modal.response || !modal.request) return
    data.CurrentRequestObj.history.push({
      date: new Date(),
      status: data.CurrentRequestObj.status,
      solution: data.CurrentRequestObj.solution,
      userID: user.user._id,
      username: user.user.personalData.username,
    })
    if (modal.type === MODAL.modalType.saveRequest) {
      updateItem(modal.request, data.CurrentRequestObj, data, modal)
    }
    modal.setIsVisible(false)
  }, [modal.response])

  return (
    <div
      className={cl.buttonsPanel}
      style={{
        height: '5%',
        justifyContent: 'space-between',
      }}>
      <Button style={appData.buttons.style} onClick={openHistory}>
        <div className={cl.buttonImg} tabIndex={7}>
          <History
            style={{
              width: '90%',
              height: '100%',
            }}
          />
        </div>
        {appData.buttons.history}
      </Button>

      <Button
        style={{
          opacity: disabledSave ? 0.6 : 1,
          ...appData.buttons.style,
        }}
        onClick={pressSave}
        disabled={disabledSave}>
        <div className={cl.buttonImg} tabIndex={8}>
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
