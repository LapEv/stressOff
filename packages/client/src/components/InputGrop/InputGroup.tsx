import { memo, useEffect, useState } from 'react'
import cl from './InputGroup.module.css'
import { appData } from 'data/app'
import { InputProps } from './interfaces'

export const InputGroup = memo((props: InputProps) => {
  const {
    data,
    main,
    optional,
    containerwidth,
    changetext,
    value,
    ...otherProps
  } = props
  const [_value, setValue] = useState<string>(value ?? '')

  const onChange = (value: string) => {
    setValue(value)
    if (main === 'modal' || main === 'sortingBySearch' || main === 'custom') {
      changetext?.(value)
      return
    }
    if (optional) {
      const current = data.CurrentObj
      data.setCurrentObj({
        ...data.CurrentObj,
        [main]: {
          [optional]: value,
          ...(current[main as keyof typeof current] as {}),
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
    if (
      !data ||
      main === 'modal' ||
      optional === 'username' ||
      optional === 'password'
    )
      return

    const activeObj = data.ActiveObj[
      main as keyof typeof data.ActiveObj
    ] as string
    optional
      ? setValue(
          appData.AddLabel.includes(
            activeObj[optional as keyof typeof activeObj] as string,
          )
            ? ''
            : (activeObj[optional as keyof typeof activeObj] as string) || '',
        )
      : setValue(
          appData.AddLabel.includes(
            activeObj[optional as keyof typeof activeObj] as string,
          )
            ? ''
            : (activeObj[optional as keyof typeof activeObj] as string) || '',
        )
  }, [data?.ActiveObj])

  return (
    <div className={cl.group} style={containerwidth}>
      {otherProps.label}
      <input
        {...otherProps}
        className={cl.input}
        value={_value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
})
