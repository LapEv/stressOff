import { useEffect, useState, memo } from 'react'
import cl from './textAreaGroup.module.css'
import { appData } from 'data/app'
import { ITextareaGroup } from './interfaces'

export const TextareaGroup = memo((props: ITextareaGroup) => {
  const { data, main, optional } = props
  const { containerwidth } = props
  const [value, setValue] = useState('')

  const onChange = (value: string) => {
    setValue(value)
    const current = data.CurrentObj
    if (optional) {
      data.setCurrentObj({
        ...data.CurrentObj,
        [main]: {
          ...(current[main as keyof typeof current] as {}),
          [optional]: value,
        },
      })
      return
    }
    if (main) {
      data.setCurrentObj({
        ...data.CurrentObj,
        [main]: value,
      })
    }
  }

  useEffect(() => {
    const activeObj = data.ActiveObj[main as keyof typeof data.ActiveObj]
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
