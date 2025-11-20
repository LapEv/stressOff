import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from './textAreaGroup.module.css'
import { Context } from '../../main'
import { appData } from 'data/app'
import { ITextareaGroup } from './interfaces'
import { INotificationObj, ITitle } from 'store/Data/interfaces'
import { prepareCategoryObject } from 'functions/prepareCategoryObject'

export const TextAreaGroupNotification = observer((props: ITextareaGroup) => {
  const { data } = useContext(Context)
  const { main, optional } = props
  const { containerwidth } = props
  const [value, setValue] = useState('')

  const onChange = (value: string) => {
    setValue(value)
    const newObject = prepareCategoryObject(
      optional,
      main,
      value,
      data.CurrentNotificationObj,
      data.ActiveNotificationObj,
    )
    data.setCurrentNotificationObj(newObject as INotificationObj)
  }

  useEffect(() => {
    const activeObj = data.ActiveNotificationObj[
      main as keyof typeof data.ActiveNotificationObj
    ] as ITitle | string
    optional
      ? setValue(
          appData.AddLabel.includes(
            activeObj[optional as keyof typeof activeObj],
          )
            ? ''
            : activeObj[optional as keyof typeof activeObj],
        )
      : setValue(
          appData.AddLabel.includes(activeObj as string)
            ? ''
            : (activeObj as string),
        )
  }, [data?.ActiveNotificationObj])

  return (
    <div className={cl.group} style={containerwidth}>
      {props.label}
      <textarea
        {...props}
        className={cl.textarea}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
})
