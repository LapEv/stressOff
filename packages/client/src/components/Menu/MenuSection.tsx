import { useRef, useState, memo } from 'react'
import cl from './menu.module.css'
import { IMenuSection } from './interfaces'
import { DownArrow } from 'images'
import { MenuItems } from './MenuItems'

export const MenuSection = memo(
  ({
    section,
    items,
    setActiveItem,
    activeItem,
    changeState,
    state,
    style,
    data,
  }: IMenuSection) => {
    const [activeList, setActiveList] = useState<boolean>(true)
    const refIcon = useRef<HTMLDivElement>(null)
    const iconClasses = [cl.sectionIcon, cl.sectionIconDown]
    const itemContainerClasses = [cl.itemsContainer]

    if (!activeList) {
      iconClasses.pop()
    }

    const menuItems = items.filter(value => value.category === section)

    const setActive = () => {
      setActiveList(prev => !prev)
      const findActive = items.find(value => value._id === activeItem._id)
      console.log('activeItem = ', activeItem)
      console.log('findActive = ', findActive)
      if (findActive) {
        setActiveItem({
          ...activeItem,
          _id: items[0]._id,
          category: items[0].category,
        })
      } else {
        changeState(!state)
      }
    }

    return (
      <div className={cl.section} style={style}>
        {section && (
          <div className={cl.sectionContainer}>
            <div className={cl.sectionText}>{section}</div>
            <div
              ref={refIcon}
              className={iconClasses.join(' ')}
              onClick={setActive}>
              <DownArrow />
            </div>
          </div>
        )}
        <div className={itemContainerClasses.join(' ')}>
          {menuItems.map((value, index) => (
            <MenuItems
              key={`${value}__${index}`}
              value={value}
              index={index}
              activeContainer={activeList}
              setActiveContainer={() => setActiveList(true)}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
              state={state}
              data={data}
            />
          ))}
        </div>
      </div>
    )
  },
)
