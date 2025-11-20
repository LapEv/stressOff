import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from '../../General.module.css'
import Scrollbar from 'react-scrollbars-custom'
import { Context } from '../../../main'
import { MODAL } from 'data/modal'
import { deleteItem, saveItem, updateItem } from 'functions'
import { ISoundsModule } from './interfaces'
import { NameSection } from 'components/NameSection/NameSection'
import { InputGroup } from 'components/InputGrop/InputGroup'
import { appData } from 'data/app'
import { CategoryList } from './CategoryList'
import { DropDownData } from './DropDownData'
import { ImagesList } from './ImagesList'
import { SoundsList } from './SoundsList'
import { ButtonsGroup } from './ButtonsGroup'
import { TextareaGroup } from 'components/TextArea/textAreaGroup'

export const SoundsModule = observer(({ type }: ISoundsModule) => {
  const { data, modal } = useContext(Context)

  useEffect(() => {
    data.setCurrentObj(data.ActiveObj)
  }, [data.ActiveObj])

  useEffect(() => {
    if (!modal.response || !modal.request) return
    const { _id, ...object } = data.CurrentObj
    if (modal.type === MODAL.modalType.save) {
      object.id !== '0'
        ? updateItem(modal.request, data.CurrentObj, data, modal)
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
          title={data.ActiveObj.title?.RUS}
          id={`id: ${data.ActiveObj.id}`}
        />
        <div className={cl.panels} style={{ height: '15%' }}>
          <InputGroup
            tabIndex={1}
            id={'1'}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.internalName}
            value={data.ActiveObj.name || ''}
            main="name"
            type="sounds"
          />
          <CategoryList type={type} />
        </div>
        <div className={cl.panels} style={{ height: '15%' }}>
          <InputGroup
            tabIndex={3}
            id={'3'}
            required
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.nameRUS}
            main="title"
            optional="RUS"
            value=""
            type="sounds"
          />
          <InputGroup
            required
            tabIndex={4}
            id={'4'}
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={appData.adminLabel.nameENG}
            main="title"
            optional="ENG"
            value=""
            type="sounds"
          />
        </div>
        <div className={cl.panelsSound} style={{ height: '20%' }}>
          <DropDownData
            required
            tabIndex={5}
            placeholder={appData.placeholders.required}
            label={appData.adminLabel.location}
            containerwidth={{ width: '25%' }}
            style={{ cursor: 'pointer' }}
            list={appData.locationArr}
            type={type}
            id="4_location"
            main="location"
          />
          <DropDownData
            required
            tabIndex={6}
            placeholder={appData.placeholders.required}
            label={appData.adminLabel.payment}
            containerwidth={{ width: '25%' }}
            style={{ cursor: 'pointer' }}
            list={appData.booleanArr}
            type={type}
            id="6_payment"
            main="payment"
          />
          <SoundsList type={type} tabIndex={7} />
        </div>
        <div className={cl.panels} style={{ height: '15%' }}>
          <ImagesList type={type} obj={'imgStorage'} tabIndex={8} />
        </div>
        <div className={cl.panelsTextArea} style={{ height: '20%' }}>
          <TextareaGroup
            tabIndex={9}
            id="9"
            required={false}
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%', height: '80%' }}
            maxLength={250}
            style={{ resize: 'none' }}
            label={appData.adminLabel.descriptionRUS}
            multiline="true"
            main="description"
            optional="RUS"
            value=""
          />
          <TextareaGroup
            required={false}
            tabIndex={10}
            id="10"
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%', height: '80%' }}
            maxLength={250}
            style={{ resize: 'none' }}
            multiline="true"
            label={appData.adminLabel.descriptionENG}
            main="description"
            optional="ENG"
            value=""
          />
        </div>
        <ButtonsGroup request={data.CurrentObj.globalCategory} />
      </div>
    </Scrollbar>
  )
})
