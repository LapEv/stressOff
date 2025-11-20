import { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../../General.module.css'
import { Context } from '../../../main'
import { MODAL } from 'data/modal'
import { appData } from 'data/app'
import { Button } from 'components/Button/Button'
import { Basket, Save } from 'images'
import { IButtonsGroup } from './interfaces'
import { emptyCategorySound } from 'store/data'

export const ButtonsGroup = observer(({ request }: IButtonsGroup) => {
  const { data, modal } = useContext(Context)

  const [disabledSave, setDisabledSave] = useState<boolean>(true)
  const [disabledDelete, setDisabledDelete] = useState<boolean>(true)

  const pressDelete = () => {
    if (data.ActiveWindow === 'Categories') {
      modal.setShowQuestionModal({
        title: MODAL.modalMessageTitle.attention,
        description: `${MODAL.modalMessages.deleteCategory} "${data.CurrentCategoryObj.title?.RUS}"?`,
        type: MODAL.modalType.delete,
        request: data.CurrentCategoryObj.globalCategory ?? data,
      })
      return
    }
    if (data.ActiveWindow === 'Sounds') {
      modal.setShowQuestionModal({
        title: MODAL.modalMessageTitle.attention,
        description: `${MODAL.modalMessages.deleteSound} "${data.CurrentObj.title?.RUS}"?`,
        type: MODAL.modalType.delete,
        request: data.CurrentObj.globalCategory ?? data,
      })
      return
    }
  }

  const pressSave = () => {
    if (data.ActiveWindow === 'Categories') {
      const validateErr =
        data.CurrentCategoryObj.category === ''
          ? 'Поле "Наименование" не может быть пустым!'
          : data.CurrentCategoryObj.title.RUS ===
              emptyCategorySound[0].title.RUS
            ? 'Поле "Название RUS" не может быть пустым!'
            : data.CurrentCategoryObj.title.ENG === ''
              ? 'Поле "Название ENG" не может быть пустым!'
              : data.CurrentCategoryObj.imgStorage === ''
                ? 'Поле "Иконка. Основная тема" не может быть пустым!'
                : data.CurrentCategoryObj.imgStorage_lt === ''
                  ? 'Поле "Иконка. Светлая тема" не может быть пустым!'
                  : data.CurrentCategoryObj.imgStorage ===
                      data.CurrentCategoryObj.imgStorage_lt
                    ? 'Иконки должны быть уникальны! Либо вы грузите одинаковые, либо такая иконка уже есть в системе!'
                    : ''
      if (validateErr !== '') {
        modal.setShowModal(MODAL.modalMessageTitle.error, validateErr)
        return
      }
    }

    if (data.ActiveWindow === 'Sounds') {
      console.log('CurrentObj = ', data.CurrentObj)
      console.log('Active = ', data.ActiveObj)
      const validateErr =
        data.CurrentObj.name === ''
          ? 'Поле "Наименование" не может быть пустым!'
          : data.CurrentObj.title.RUS === ''
            ? 'Поле "Название RUS" не может быть пустым!'
            : data.CurrentObj.title.ENG === ''
              ? 'Поле "Название ENG" не может быть пустым!'
              : data.CurrentObj.imgStorage === ''
                ? 'Поле "Иконка. Основная тема" не может быть пустым!'
                : data.CurrentObj.category.RUS === '' ||
                    data.CurrentObj.category.RUS === 'Добавить категорию'
                  ? 'Поле "Категория" не может быть пустым!'
                  : ''
      if (validateErr !== '') {
        modal.setShowModal(MODAL.modalMessageTitle.error, validateErr)
        return
      }
    }
    modal.setShowQuestionModal({
      title: MODAL.modalMessageTitle.attention,
      description: MODAL.modalMessages.save,
      type: MODAL.modalType.save,
      request: request ?? data.CurrentCategoryObj.globalCategory,
    })
  }

  useEffect(() => {
    setDisabledDelete(data.ActiveObj.id === '0' ? true : false)
  }, [data.ActiveObj])

  useEffect(() => {
    setDisabledDelete(data.ActiveCategoryObj.id === '0' ? true : false)
  }, [data.ActiveCategoryObj])

  useEffect(() => {
    setDisabledSave(data.IsEqual)
  }, [data.IsEqual])

  useEffect(() => {
    setDisabledSave(data.IsEqualCategory)
  }, [data.IsEqualCategory])

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
