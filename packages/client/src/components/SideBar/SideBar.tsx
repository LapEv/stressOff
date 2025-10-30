import { useEffect, useRef, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import './sidebar.scss'
import { sidebarNavItems } from 'data/sidebar'
import { Context } from '../../main'
import { Menu } from './Menu'

export const Sidebar = observer(() => {
  const { data, modal } = useContext(Context)
  const [stepHeight, setStepHeight] = useState<number>(0)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [unreadRequests, serUnreadRequests] = useState<number>(0)
  const [unreadMessages, serUnreadMessages] = useState<number>(0)
  const location = useLocation()

  const sidebarRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  const checkUnread = () => {
    serUnreadRequests(data.Requests.filter(value => value.unread).length)
    serUnreadMessages(data.Messages.filter(value => value.unread).length)
  }

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1]
    const activeItem = sidebarNavItems.findIndex(
      item => item.section === curPath,
    )
    if (activeItem) {
      data.setFilePath('')
    }
    checkUnread()
    setActiveIndex(curPath.length === 0 ? 0 : activeItem)
  }, [location])

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current?.querySelector(
        '.sidebar__menu__item',
      )
      if (indicatorRef.current) {
        indicatorRef.current.style.height = `${sidebarItem?.clientHeight as number}px`
      }
      setStepHeight(sidebarItem?.clientHeight as number)
    }, 50)
  }, [])

  useEffect(() => {
    checkUnread()
  }, [data.Requests, data.Messages])

  return (
    <div className={'scrollbar'} style={{ width: '35%' }}>
      <div className="sidebar">
        <div className="sidebar__logo">StressOff</div>
        <div ref={sidebarRef} className="sidebar__menu">
          <div
            ref={indicatorRef}
            className="sidebar__menu__indicator"
            style={{
              transform: `translateX(8%) translateY(${
                activeIndex * stepHeight
              }px)`,
            }}></div>
          <Menu
            sidebarNavItems={sidebarNavItems}
            modal={modal}
            activeIndex={activeIndex}
            unreadRequests={unreadRequests}
            unreadMessages={unreadMessages}
          />
        </div>
      </div>
    </div>
  )
})
