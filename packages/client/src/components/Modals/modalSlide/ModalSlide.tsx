import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { useNavigate } from 'react-router-dom'
import cl from './modalSlide.module.css'
import { IModalSlide } from '../interfaces'

export const ModalSlide = observer(
  ({ children, visible, setVisibleSlide, to, object }: IModalSlide) => {
    const { data } = useContext(Context)
    const rootClasses = [cl.modal]
    const rootContent = [cl.modalContent]

    if (visible) {
      rootClasses.push(cl.active)
      rootContent.push(cl.active)
    }

    const navigate = useNavigate()
    const redirect = () => {
      navigate(to)
      setVisibleSlide(false)
      setTimeout(() => {
        data.setActiveObj(object)
        data.setNewBarIndex(object._id)
      }, 500)
    }

    return (
      // <div to={to} className={rootClasses.join(' ')} onClick={redirect}>
      <div className={rootClasses.join(' ')} onClick={redirect}>
        <div className={rootContent.join(' ')}>{children}</div>
      </div>
    )
  },
)
