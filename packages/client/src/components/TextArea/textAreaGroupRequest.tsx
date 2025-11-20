import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from './textAreaGroup.module.css'
import { Context } from '../../main'
import { appData } from 'data/app'
import { ITextareaGroup } from './interfaces'
import { IREQUESTS, ITitle } from 'store/Data/interfaces'
import { prepareCategoryObject } from 'functions/prepareCategoryObject'

export const TextAreaGroupRequest = observer((props: ITextareaGroup) => {
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
      data.CurrentRequestObj,
      data.ActiveRequestObj,
    )
    data.setCurrentRequestObj(newObject as IREQUESTS)
  }

  useEffect(() => {
    const activeObj = data.ActiveRequestObj[
      main as keyof typeof data.ActiveRequestObj
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
  }, [data?.ActiveRequestObj])

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
