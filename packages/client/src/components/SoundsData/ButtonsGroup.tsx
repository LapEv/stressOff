import { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../../pages/General.module.css'
import { Context } from '../../main'
import { MODAL } from 'data/modal'
import { appData } from 'data/app'
import { Button } from 'components/Button/Button'
import { Basket, Save } from 'images'

export const ButtonsGroup = observer(() => {
  const { data, modal } = useContext(Context)

  const [disabledSave, setDisabledSave] = useState(true)
  const [disabledDelete, setDisabledDelete] = useState(true)

  const pressDelete = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: `${MODAL.modalMessages.deleteSound} "${data.CurrentObj.title?.RUS}"?`,
      type: MODAL.modalType.delete,
      request: data.CurrentObj.globalCategory,
    })
  }

  const pressSave = () => {
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: MODAL.modalMessages.save,
      type: MODAL.modalType.save,
      request: data.CurrentObj.globalCategory,
    })
  }

  useEffect(() => {
    setDisabledDelete(data.ActiveObj.id ? false : true)
  }, [data.ActiveObj])

  useEffect(() => {
    // console.log('data.IsEqual = ', data.IsEqual);
    data.IsEqual ? setDisabledSave(true) : setDisabledSave(false)
  }, [data.IsEqual])

  return (
    <div className={cl.buttonsPanel} style={{ height: '5%' }}>
      <Button
        style={{
          opacity: disabledDelete ? 0.6 : 1,
          ...appData.buttons.style,
        }}
        onClick={pressDelete}
        disabled={disabledDelete}>
        <div className={cl.buttonImg}>
          <Basket />
        </div>
        {appData.buttons.delete}
      </Button>
      <Button
        style={{
          opacity: disabledSave ? 0.6 : 1,
          ...appData.buttons.style,
        }}
        onClick={pressSave}
        disabled={disabledSave}>
        <div className={cl.buttonImg} tabIndex={11}>
          <Save />
        </div>
        {appData.buttons.save}
      </Button>
    </div>
  )
})
