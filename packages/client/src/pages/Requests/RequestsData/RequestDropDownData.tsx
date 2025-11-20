import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { appData } from 'data/app'
import { IRequestDropDownData } from './interface'
import { DropDownGroup } from 'components'

export const RequestDropDownData = observer((props: IRequestDropDownData) => {
  const { data } = useContext(Context)
  const {
    label,
    styleinputGroup,
    containerwidth,
    main,
    list,
    defaultValue,
    tabIndex,
    ...inputProps
  } = props
  const [value, setValue] = useState('')

  const onChange = (value: string) => {
    if (list.findIndex(item => item.name === value) < 0) return

    setValue(value)
    const findValue = () => {
      if (main === 'status') {
        return appData.statusRequestArr.find(item => item.name === value)?.value
      }
      return value
    }
    const intValue = findValue()

    if (main) {
      data.setCurrentRequestObj({
        ...data.CurrentRequestObj,
        [main]: intValue,
      })
    }
  }

  useEffect(() => {
    if (data.ActiveRequestObj) {
      if (main === 'status') {
        setValue(
          appData.statusRequestArr.find(
            item =>
              item.value ===
              data.ActiveRequestObj[main as keyof typeof data.ActiveRequestObj],
          )?.name as string,
        )
        return
      }
    }
  }, [data?.ActiveRequestObj])

  return (
    <DropDownGroup
      required
      tabIndex={tabIndex}
      inputProps={inputProps}
      styleinputGroup={styleinputGroup}
      placeholder={appData.placeholders.required}
      label={label}
      containerwidth={containerwidth}
      style={{ cursor: 'pointer' }}
      list={appData.locationArr}
      data={list}
      value={value}
      onChange={onChange}
    />
  )
})
