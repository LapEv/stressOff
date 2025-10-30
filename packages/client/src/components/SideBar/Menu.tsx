import { MODAL } from 'data/modal'
import { memo } from 'react'

import { NavLink } from 'react-router-dom'
import { IMenu } from './interfaces'

export const Menu = memo(
  ({
    sidebarNavItems,
    modal,
    activeIndex,
    unreadRequests,
    unreadMessages,
  }: IMenu) => {
    const Exit = () => {
      modal.setShowQuestionModal(
        MODAL.modalMessageTitle.attention,
        MODAL.modalMessages.exit,
        MODAL.modalType.exit,
      )
    }

    return sidebarNavItems.map((item, index) => {
      return item.section !== 'exit' ? (
        <NavLink
          to={item.to}
          key={`${item.section}${index}`}
          style={{ display: 'flex', height: 'auto' }}>
          <div
            className={`sidebar__menu__item ${
              activeIndex === index ? 'active' : ''
            }`}>
            <div
              className={`sidebar__menu__item__icon ${
                activeIndex === index ? 'active' : ''
              }`}>
              {item.icon}
            </div>
            <div className="sidebar__menu__item__text">{item.display}</div>
          </div>
          {item.section === 'requests' && unreadRequests > 0 && (
            <div
              className="unread"
              style={{
                background: activeIndex === index ? '#204d48' : '#15a522',
              }}>
              {unreadRequests}
            </div>
          )}
          {item.section === 'messages' && unreadMessages > 0 && (
            <div
              className="unread"
              style={{
                background: activeIndex === index ? '#204d48' : '#15a522',
              }}>
              {unreadMessages}
            </div>
          )}
        </NavLink>
      ) : (
        <div
          className={`sidebar__menu__item ${
            activeIndex === index ? 'active' : ''
          }`}
          key={`${item.section}${index}`}
          onClick={Exit}>
          <div
            className={`sidebar__menu__item__icon ${
              activeIndex === index ? 'active' : ''
            }`}>
            {item.icon}
          </div>
          <div className="sidebar__menu__item__text">{item.display}</div>
        </div>
      )
    })
  },
)
