import { memo } from 'react'
import cl from './modalMessage.module.css'
import { IModalMessageSlide } from '../interfaces'

export const ModalMessageSlide = memo(
  ({ title, description }: IModalMessageSlide) => {
    return (
      <div className={cl.messageSlide}>
        <h3 className={cl.titleSlide}>{title}</h3>
        <div className={cl.descriptionSlide}>{description}</div>
      </div>
    )
  },
)
