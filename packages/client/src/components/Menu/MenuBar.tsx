import { useEffect, useRef, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Scrollbar } from 'react-scrollbars-custom'
import cl from './menu.module.css'
import { IActiveParams, IMenu } from './interfaces'
import { Context } from '../../main'
import { MenuSection } from './MenuSection'

export const MenuBar = observer(({ items }: IMenu) => {
  const { data } = useContext(Context)
  const [indicatorY, setindicatorY] = useState<number>(20)
  const [activeItem, setActiveItem] = useState<IActiveParams>({
    _id: items[0]._id,
    position: 0,
  })
  const [state, changeState] = useState<boolean>(false)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<any>(null)

  const itemsSection = [...new Set(items.map(item => item.category))]

  const setActive = ({ _id, position }: IActiveParams) => {
    setActiveItem({ _id, position })
    setindicatorY(position - 45)
    data.setActiveObjById({ _id, position })
    if (data.NewBarIndex && position) {
      scrollRef.current?.centerAt(0, position)
      data.setNewBarIndex('')
    }
    if (data.NullIndex && position) {
      scrollRef.current?.centerAt(0, position)
      data.setNullIndex('')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (indicatorRef.current) {
        indicatorRef.current.style.height = '40px'
      }
    }, 50)
    data.setActiveObjById(activeItem)
  }, [])

  useEffect(() => {}, [data.NewBarIndex])

  return (
    <Scrollbar ref={scrollRef} className={cl.menu} style={{ width: '22%' }}>
      <div
        ref={indicatorRef}
        className={cl.indicator}
        style={{
          transform: `translateX(8%) translateY(${indicatorY}px)`,
        }}></div>
      {itemsSection.map((category, index) => (
        <MenuSection
          key={`${category}_${index}`}
          section={category}
          items={items.filter(value => value.category === category)}
          setActiveItem={setActive}
          activeItem={activeItem}
          changeState={changeState}
          state={state}
          style={
            index >= itemsSection.length - 1
              ? { paddingBottom: 20 }
              : { paddingBottom: 0 }
          }
          data={data}
        />
      ))}
    </Scrollbar>
  )
})
