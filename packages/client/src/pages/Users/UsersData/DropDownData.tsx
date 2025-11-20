import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { appData } from 'data/app'
import { DropDownGroup } from 'components'
import { IDropDownDataUser } from '../interfaces'

export const DropDownData = observer((props: IDropDownDataUser) => {
  const { data } = useContext(Context)
  const {
    styleinputGroup,
    containerwidth,
    main,
    optional,
    list,
    defaultValue,
    type,
    changeValue,
    ...inputProps
  } = props
  const [value, setValue] = useState<string | string[]>(defaultValue ?? '')

  const onChange = (value: string) => {
    const checkValue = list.findIndex(item => item.name === value)
    if (checkValue < 0) return

    if (main === 'roles') {
      multiChoiseRoles(value)
      return
    }
    setValue(value)

    if (main === 'custom') {
      changeValue?.(value as string)
      return
    }

    const findValue = (value: string) => {
      if (optional === 'type') {
        return appData.typeUsersArr.find(item => item.name === value)?.value
      }
      if (optional === 'language') {
        return appData.languageArr.find(item => item.name === value)?.value
      }
      if (optional === 'theme') {
        return appData.themeArr.find(item => item.name === value)?.value
      }
      return value
    }
    const intValue = findValue(value)
    if (optional) {
      const current = data.CurrentUserObj
      data.setCurrentUserObj({
        ...current,
        [main]: {
          ...(current[main as keyof typeof current] as {}),
          [optional]: intValue,
        },
      })
      return
    }
    if (main) {
      data.setCurrentUserObj({
        ...data.CurrentUserObj,
        [main]: intValue,
      })
    }
  }

  const multiChoiseRoles = (value: string) => {
    const newValue = data.CurrentUserObj.personalData.roles.includes(value)
      ? data.CurrentUserObj.personalData.roles.filter(item => item !== value)
      : data.CurrentUserObj.personalData.roles.concat(value)
    setValue(newValue)
    data.setCurrentUserObj({
      ...data.CurrentUserObj,
      personalData: {
        ...data.CurrentUserObj.personalData,
        roles: newValue,
      },
    })
  }

  useEffect(() => {
    if (data.ActiveUserObj) {
      if (main === 'roles') {
        setValue(data.ActiveUserObj.personalData.roles)
        return
      }
      if (optional === 'type') {
        setValue(
          appData.typeUsersArr.find(
            item => item.value === data.ActiveUserObj.personalData[optional],
          )?.name as string,
        )
        return
      }
      if (optional === 'language') {
        setValue(
          appData.languageArr.find(
            item => item.value === data.ActiveUserObj.appData[optional],
          )?.name as string,
        )
        return
      }
      if (optional === 'theme') {
        setValue(
          appData.themeArr.find(
            item => item.value === data.ActiveUserObj.appData[optional],
          )?.name as string,
        )
        return
      }
    }
  }, [data?.ActiveUserObj])

  return (
    <DropDownGroup
      required
      tabIndex={5}
      inputProps={inputProps}
      styleinputGroup={styleinputGroup}
      placeholder={appData.placeholders.required}
      containerwidth={containerwidth}
      style={{ cursor: 'pointer' }}
      list={appData.locationArr}
      type={type}
      data={list}
      value={value as string}
      onChange={onChange}
    />
  )
})
