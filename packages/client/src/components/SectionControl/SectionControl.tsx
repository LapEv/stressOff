import { useEffect, useRef, memo } from 'react'
import clSection from './sectionControl.module.css'
import { DownArrow } from 'images'
import { ISection } from './interfaces'
import { NameSection } from 'components/NameSection/NameSection'

export const SectionControl = memo(
  ({ nameSection, toogleContainer, active, style }: ISection) => {
    const iconRef = useRef<HTMLDivElement>(null)

    const toogleData = () => {
      iconRef.current?.classList.toggle(`${clSection.left}`)
      toogleContainer()
    }

    useEffect(() => {
      active ?? toogleData()
    }, [])

    return (
      <div
        className={clSection.labelSection}
        style={style}
        onClick={toogleData}>
        <NameSection title={nameSection} style={{ width: 'auto' }} />
        <div className={clSection.line}></div>
        <div className={clSection.iconContainer} ref={iconRef}>
          <DownArrow className={clSection.icon} style={{ marginTop: 0 }} />
        </div>
      </div>
    )
  },
)
