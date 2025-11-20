import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import cl from './textAreaGroup.module.css'
import { appData } from 'data/app'
import { ITextareaGroup } from './interfaces'
import { ICurrentObj, ITitle } from 'store/Data/interfaces'
import { prepareObject } from 'functions/prepareObject'

export const TextareaGroup = observer((props: ITextareaGroup) => {
  const { data } = useContext(Context)
  const { main, optional } = props
  const { containerwidth } = props
  const [value, setValue] = useState('')

  const onChange = (value: string) => {
    setValue(value)
    const newObject = prepareObject(
      optional,
      main,
      value,
      data.CurrentObj,
      data.ActiveObj,
    )
    data.setCurrentObj(newObject as ICurrentObj)
  }

  useEffect(() => {
    const activeObj = data.ActiveObj[main as keyof typeof data.ActiveObj] as
      | ITitle
      | string
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
  }, [data?.ActiveObj])

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
