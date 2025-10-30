import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../../pages/General.module.css'
import { saveItem } from '../../functions/saveItem'
import { updateItem } from '../../functions/updateItem'
import Scrollbar from 'react-scrollbars-custom'
import { Context } from '../../main'
import { MODAL } from 'data/modal'
import { NameSection } from 'components/NameSection/NameSection'
import { InputGroup } from 'components/InputGrop/InputGroup'
import { appData } from 'data/app'
import { ButtonsGroup } from './ButtonsGroup'
import { ImagesList } from './ImagesList'
import { deleteItem } from 'functions'

export const CategoriesModule = observer(() => {
  const { data, modal } = useContext(Context)

  useEffect(() => {
    data.setCurrentObj(data.ActiveObj)
    console.log('data.ActiveObj = ', data.ActiveObj)
    console.log('category = ', data.ActiveObj.category)
  }, [data.ActiveObj])

  useEffect(() => {
    if (!modal.response || !modal.request) return
    if (modal.type === MODAL.modalType.save) {
      data.CurrentObj._id !== '0'
        ? updateItem(modal.request, data.CurrentObj as any, data, modal)
        : saveItem(modal.request, data.CurrentObj, data, modal)
    }
    if (modal.type === MODAL.modalType.delete) {
      deleteItem(modal.request, data.CurrentObj, data, modal)
    }
    modal.setIsVisible(false)
  }, [modal.response])

  return (
    <Scrollbar style={{ width: '78%' }}>
      <div className={cl.workPanel}>
        <NameSection
          title={data.ActiveObj.title.RUS}
          id={`id: ${data.ActiveObj.id}`}
        />
        <div className={cl.panels}>
          <InputGroup
            tabIndex={1}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.internalName}
            value={data.ActiveObj.category || ''}
            main="category"
            data={data}
          />
        </div>
        <div className={cl.panels}>
          <InputGroup
            tabIndex={2}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.nameRUS}
            main="title"
            optional="RUS"
            data={data}
            value=""
          />
          <InputGroup
            required
            tabIndex={3}
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.nameENG}
            main="title"
            optional="ENG"
            data={data}
            value=""
          />
        </div>
        <div className={cl.panels} style={{ height: 150 }}>
          <ImagesList
            data={data}
            type={'Categories'}
            obj={'imgStorage'}
            tabIndex={4}
          />
        </div>
        <div className={cl.panels} style={{ height: 150 }}>
          <ImagesList
            data={data}
            type={'Categories'}
            obj={'imgStorage_lt'}
            tabIndex={5}
          />
        </div>
        <ButtonsGroup />
      </div>
    </Scrollbar>
  )
})
