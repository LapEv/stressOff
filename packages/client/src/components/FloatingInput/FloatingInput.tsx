import { memo } from 'react'
import classes from './FloatingInput.module.css'
import { IFloatingInput } from './interfaces'

export const FloatingInput = memo((props: IFloatingInput) => {
  return (
    <div className={classes.inputGroup}>
      <input {...props} className={classes.input} />
      <span className={classes.highlight}></span>
      <span className={classes.bar}></span>
      <label className={classes.label}>{props.label}</label>
    </div>
  )
})
