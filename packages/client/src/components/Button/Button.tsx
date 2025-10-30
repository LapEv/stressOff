import { memo } from 'react'
import cl from './Button.module.css'
import { IButton } from './interfaces'

export const Button = memo(
  ({ children, opacity, visible, ...props }: IButton) => {
    const rootClasses = [cl.button]

    if (visible) {
      rootClasses.push(cl.active)
    }

    if ((opacity as number) >= 0 || (opacity as number) <= 1) {
      rootClasses.push(cl.opacity)
    }

    return (
      <button {...props} className={rootClasses.join(' ')}>
        {children}
      </button>
    )
  },
)
