import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../../General.module.css'
import { saveItem } from '../../../functions/saveItem'
import { updateItem } from '../../../functions/updateItem'
import Scrollbar from 'react-scrollbars-custom'
import { Context } from '../../../main'
import { MODAL } from 'data/modal'
import { NameSection } from 'components/NameSection/NameSection'
import { InputGroup } from 'components/InputGrop/InputGroup'
import { appData } from 'data/app'
import { ButtonsGroup } from '../../Sounds/SoundsData/ButtonsGroup'
import { deleteItem } from 'functions'
import { ImagesCategoryList } from './ImagesCategoryList'

export const CategoriesModule = observer(() => {
  const { data, modal } = useContext(Context)

  useEffect(() => {
    data.setCurrentCategoryObj(data.ActiveCategoryObj)
  }, [data.ActiveCategoryObj])

  useEffect(() => {
    if (!modal.response || !modal.request) return
    if (modal.type === MODAL.modalType.save) {
      data.CurrentCategoryObj.id !== '0'
        ? updateItem(modal.request, data.CurrentCategoryObj, data, modal)
        : saveItem(modal.request, data.CurrentCategoryObj, data, modal)
    }
    if (modal.type === MODAL.modalType.delete) {
      deleteItem(modal.request, data.CurrentCategoryObj, data, modal)
    }
    modal.setIsVisible(false)
  }, [modal.response])

  return (
    <Scrollbar style={{ width: '78%' }}>
      <div className={cl.workPanel}>
        <NameSection
          title={data.ActiveCategoryObj.title.RUS}
          id={`id: ${data.ActiveCategoryObj.id}`}
        />
        <div className={cl.panels}>
          <InputGroup
            tabIndex={1}
            id={'1'}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.internalName}
            value={data.ActiveCategoryObj.category || ''}
            main="category"
            type="category"
          />
        </div>
        <div className={cl.panels}>
          <InputGroup
            tabIndex={2}
            id={'2'}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.nameRUS}
            main="title"
            optional="RUS"
            value={data.ActiveCategoryObj.title.RUS || ''}
            type="category"
          />
          <InputGroup
            required
            tabIndex={3}
            id={'2'}
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.nameENG}
            main="title"
            optional="ENG"
            value={data.ActiveCategoryObj.title.ENG || ''}
            type="category"
          />
        </div>
        <div className={cl.panels} style={{ height: 150 }}>
          <ImagesCategoryList
            data={data}
            type={'Categories'}
            obj={'imgStorage'}
            tabIndex={4}
          />
        </div>
        <div className={cl.panels} style={{ height: 150 }}>
          <ImagesCategoryList
            data={data}
            type={'Categories'}
            obj={'imgStorage_lt'}
            tabIndex={5}
          />
        </div>
        <ButtonsGroup request={data.CurrentCategoryObj.globalCategory} />
      </div>
    </Scrollbar>
  )
})
