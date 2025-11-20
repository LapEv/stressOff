import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cl from './modalMessage.module.css'
import { Context } from '../../../main'
import { appData } from 'data/app'
import { Button } from 'components/Button/Button'
import { InputGroup } from 'components/InputGrop/InputGroup'
import { IModalMessage } from '../interfaces'

export const ModalMessage = observer(
  ({ title, description, buttons, response, input }: IModalMessage) => {
    const { modal } = useContext(Context)
    const [value, setValue] = useState<string>('')

    const responseText = (value: string) => {
      setValue(value)
      modal.setInputText(value)
    }

    return (
      <div className={cl.message}>
        <h3 className={cl.title}>{title}</h3>
        <div className={cl.description}>{description}</div>
        {input && (
          <InputGroup
            tabIndex={1}
            id={'1'}
            required
            containerwidth={{ width: '77%' }}
            style={{ marginBottom: 20 }}
            value={value}
            type={'modal'}
            main="modal"
            changetext={responseText}
            autoFocus
          />
        )}
        {buttons && (
          <div className={cl.buttonsContainer}>
            <Button
              style={{ width: 75, opacity: value === '' && input ? 0.6 : 1 }}
              tabIndex={2}
              onClick={() => response(true)}
              disabled={value === '' && input ? true : false}>
              {appData.buttons.yes}
            </Button>
            <Button
              style={{ width: 75 }}
              tabIndex={3}
              onClick={() => response(false)}>
              {appData.buttons.no}
            </Button>
          </div>
        )}
      </div>
    )
  },
)
