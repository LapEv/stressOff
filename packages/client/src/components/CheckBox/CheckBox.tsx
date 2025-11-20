import { useState, useEffect, ChangeEvent, memo } from 'react'
import cl from './checkBox.module.css'
import { ICheckBox } from './interfaces'

export const CheckBox = memo(
  ({
    containerwidth,
    tabIndex,
    value,
    name,
    label,
    onChangeChecked,
  }: ICheckBox) => {
    const [check, setCheck] = useState<boolean>(value || false)

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
      setCheck(event.currentTarget.checked)
      onChangeChecked(event.currentTarget.checked)
    }

    return (
      <div className={cl.group} style={containerwidth} tabIndex={tabIndex}>
        <input
          type="checkbox"
          className={cl.checkbox}
          id={name}
          checked={check}
          onChange={changeValue}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    )
  },
)
