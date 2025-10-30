import { memo } from 'react'
import cl from './modal.module.css'
import { IModal } from '../interfaces'

export const Modal = memo(({ children, visible, setVisible }: IModal) => {
  const rootClasses = [cl.modal]
  const rootContent = [cl.modalContent]

  if (visible) {
    rootClasses.push(cl.active)
    rootContent.push(cl.active)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={rootContent.join(' ')} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
})
