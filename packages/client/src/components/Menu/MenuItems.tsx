import { memo, useEffect, useRef, useState } from 'react'
import cl from './menu.module.css'
import { IMenuItems } from './interfaces'

export const MenuItems = memo(
  ({
    value,
    index,
    activeContainer,
    setActiveContainer,
    setActiveItem,
    activeItem,
    state,
    data,
  }: IMenuItems) => {
    const itemClasses = [cl.item, index > 0 ? cl.closeItem : '']
    const [unread, setUnread] = useState<boolean>(activeContainer)
    const [active, setActive] = useState<boolean>(
      value._id === activeItem._id ? true : false,
    )
    const refItem = useRef<HTMLDivElement>(null)

    if (activeContainer) {
      itemClasses.pop()
    }

    const setActiveElement = () => {
      setActive(true)
      setActiveItem({
        _id: value._id,
        position: refItem.current?.offsetTop as number,
        category: value.category,
      })
      setUnread(false)
    }

    useEffect(() => {
      if (value._id !== activeItem._id) {
        setActive(false)
      }
      if (!active && value._id === activeItem._id) {
        setActiveElement()
      }
    }, [activeItem])

    useEffect(() => {
      if (active) {
        setActiveItem({
          _id: value._id,
          position: refItem.current?.offsetTop as number,
          category: value.category,
        })
      }
    }, [])

    useEffect(() => {
      setTimeout(() => {
        if (active) {
          setActiveItem({
            _id: value._id,
            position: refItem.current?.offsetTop as number,
            category: value.category,
          })
        }
      }, 300)
    }, [state])

    useEffect(() => {
      if (data.NewBarIndex) {
        if (value._id !== data.NewBarIndex) {
          setActive(false)
        }
        if (value._id === data.NewBarIndex) {
          if (!activeContainer) {
            setActiveContainer()
            setTimeout(() => {
              setActiveElement()
            }, 350)
            return
          }
          setActiveElement()
        }
      }
    }, [data.NewBarIndex])

    useEffect(() => {
      if (data.NullIndex) {
        if (value._id !== activeItem._id) {
          setActive(false)
        }
        if (value._id === data.NullIndex) {
          setActiveElement()
        }
      }
    }, [data.NullIndex])

    return (
      <div
        ref={refItem}
        className={`${itemClasses.join(' ')} ${active ? cl.activeItem : ''}`}
        onClick={setActiveElement}>
        {value.item}
        {unread && <div className={cl.circle}></div>}
      </div>
    )
  },
)
