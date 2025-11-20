import { useContext, useEffect, useState } from 'react'
import cl from './InputGroup.module.css'
import { appData } from 'data/app'
import { InputProps } from './interfaces'
import { observer } from 'mobx-react'
import { Context } from '../../main'
import { prepareCategoryObject } from 'functions/prepareCategoryObject'
import {
  ICurrentCategoryObj,
  ICurrentObj,
  IUserObj,
  INotificationObj,
  IREQUESTS,
} from 'store/Data/interfaces'
import { prepareObject } from 'functions/prepareObject'

export const InputGroup = observer((props: InputProps) => {
  const { data } = useContext(Context)
  const {
    main,
    optional,
    containerwidth,
    changetext,
    value,
    type,
    ...otherProps
  } = props
  const [_value, setValue] = useState<string>(value)

  const onChange = (value: string) => {
    setValue(value)
    if (
      type === 'modal' ||
      main === 'sortingBySearch' ||
      type === 'custom' ||
      main === 'noData'
    ) {
      changetext?.(value)
      return
    }
    if (type === 'category') {
      const newObject = prepareCategoryObject(
        optional,
        main,
        value,
        data.CurrentCategoryObj,
        data.ActiveCategoryObj,
      )
      data.setCurrentCategoryObj(newObject as ICurrentCategoryObj)
      return
    }
    if (type === 'user') {
      const newObject = prepareCategoryObject(
        optional,
        main,
        value,
        data.CurrentUserObj,
        data.ActiveUserObj,
      )
      data.setCurrentUserObj(newObject as IUserObj)
      return
    }
    if (type === 'notifications') {
      const newObject = prepareCategoryObject(
        optional,
        main,
        value,
        data.CurrentNotificationObj,
        data.ActiveNotificationObj,
      )
      data.setCurrentNotificationObj(newObject as INotificationObj)
      return
    }
    if (type === 'request') {
      const newObject = prepareCategoryObject(
        optional,
        main,
        value,
        data.CurrentRequestObj,
        data.ActiveRequestObj,
      )
      data.setCurrentRequestObj(newObject as IREQUESTS)
      return
    }
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
    if (
      !data ||
      main === 'noData' ||
      main === 'modal' ||
      optional === 'username' ||
      optional === 'password'
    )
      return

    const obj =
      type === 'category'
        ? data.ActiveCategoryObj
        : type === 'user'
          ? data.ActiveUserObj
          : type === 'notifications'
            ? data.ActiveNotificationObj
            : type === 'request'
              ? data.ActiveRequestObj
              : data.ActiveObj
    const activeObj = obj[main as keyof typeof obj] as string

    optional
      ? setValue(
          appData.AddLabel.includes(
            activeObj[optional as keyof typeof activeObj] as string,
          )
            ? ''
            : (activeObj[optional as keyof typeof activeObj] as string) || '',
        )
      : setValue(appData.AddLabel.includes(activeObj) ? '' : activeObj || '')
  }, [
    data.ActiveObj,
    data.ActiveCategoryObj,
    data.ActiveUserObj,
    data.ActiveNotificationObj,
    data.ActiveRequestObj,
  ])

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
