import { useRef, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { useNavigate } from 'react-router-dom'
import { forbiddenKeycodes } from './const'
import './DropDownGroup.scss'
import { DownArrow } from 'images'
import { emptySound } from 'store/data'
import { IDropDownGroup } from './interfaces'
import { CATEGORIES_ROUTE } from 'data/sidebar'

export const DropDownGroup = ({
  data,
  styleinputGroup,
  getFirstValueOnBlur,
  containerwidth,
  value,
  onChange,
  inputProps,
}: IDropDownGroup) => {
  const iconRef = useRef<HTMLDivElement>(null)
  const inputGroupRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<Scrollbar>(null)
  const [focus, setFocus] = useState(false)
  const navigate = useNavigate()

  const inputBlur = () => {
    if (iconRef.current?.classList.contains('down')) {
      iconRef.current.classList.toggle('down')
      iconRef.current.classList.toggle('left')
    }
    if (scrollRef.current?.props.className?.includes('activated')) {
      scrollRef.current.props.className.replace('activated', '')
    }
    const list = [...(listRef.current?.children as HTMLCollection)]

    list.map(value => {
      if (value.classList.contains('activeItem')) {
        value.classList.remove('activeItem')
      }
    })
    setFocus(false)
  }

  const setActiveList = () => {
    setFocus(prevState => !prevState)
    iconRef.current?.classList.toggle('down')
    iconRef.current?.classList.toggle('left')
    inputRef.current?.focus()
    inputRef.current?.select()
  }

  const KeyPress = (key: string) => {
    if (forbiddenKeycodes.includes(key)) return
    if (!focus) setActiveList()
    if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Enter') return

    const list = [...(listRef.current?.children as HTMLCollection)]
    const index = list.findIndex(value =>
      value.classList.contains('activeItem'),
    )

    if (key === 'ArrowDown') {
      if (index > -1 && index < list.length - 1) {
        listRef.current?.children[index].classList.remove('activeItem')
      }
      if (index < list.length - 1) {
        listRef.current?.children[index + 1].classList.add('activeItem')
      }

      scrollRef.current?.scrollTo(0, index * 35)
    }
    if (key === 'ArrowUp') {
      if (index === 0) {
        listRef.current?.children[index].classList.remove('activeItem')
      }
      if (index > 0) {
        listRef.current?.children[index].classList.remove('activeItem')
        listRef.current?.children[index - 1].classList.add('activeItem')
      }
      scrollRef.current?.scrollTo(0, (index - 2) * 35)
    }
    if (key === 'Enter') {
      if (index < 0) return
      onChange(listRef.current?.children[index].textContent as string)
      setActiveList()
    }
  }

  return (
    <div className="dropDown" onBlur={inputBlur} style={containerwidth}>
      {inputProps?.label}
      <div className={'dropDown__inputGroup'}>
        <div
          ref={inputGroupRef}
          style={styleinputGroup}
          className="dropDown__inputGroup__styleInput">
          <input
            ref={inputRef}
            {...inputProps}
            value={value}
            className="dropDown__inputGroup__styleInput__input"
            onBlur={e =>
              getFirstValueOnBlur ? getFirstValueOnBlur(e.target.value) : null
            }
            onClick={e => (e.preventDefault(), setActiveList())}
            onKeyDown={e => KeyPress(e.key)}
            onChange={e => onChange(e.target.value)}
          />
          <div
            className="dropDown__inputGroup__styleInput__icon left"
            ref={iconRef}
            onMouseDown={e => e.preventDefault()}
            onClick={setActiveList}>
            <DownArrow />
          </div>
        </div>
        <Scrollbar
          // eslint-disable-next-line
          ref={scrollRef as any}
          className={`dropDown__activeList ${focus ? 'activated' : ''}`}
          noDefaultStyles={true}
          noScrollX={true}
          noScrollY={data.length < 5 ? true : false}
          style={{
            height: focus ? (data.length < 5 ? data.length * 40 : 200) : 0,
          }}>
          <div className={'list'} ref={listRef}>
            {data.map(item => (
              <div
                key={`${item.name}${item.id}`}
                className="dropDown__activeList__item"
                onMouseDown={e => (
                  e.preventDefault(),
                  setActiveList(),
                  (e.target as HTMLElement).textContent ===
                  emptySound[0].title.RUS
                    ? navigate(CATEGORIES_ROUTE)
                    : onChange((e.target as HTMLElement).textContent)
                )}>
                {item.name}
              </div>
            ))}
          </div>
        </Scrollbar>
      </div>
    </div>
  )
}
