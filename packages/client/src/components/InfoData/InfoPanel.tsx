import { useRef, memo } from 'react'
import cl from './InfoPanel.module.css'
import { IInfoPanel } from './interfaces'
import { SectionControl } from 'components/SectionControl/SectionControl'

export const InfoPanel = memo(({ nameSection, arrData }: IInfoPanel) => {
  const generalRef = useRef<HTMLDivElement>(null)

  const toogleContainer = () => {
    generalRef.current?.classList.toggle(`${cl.activeGeneral}`)
  }

  const Data = ({ arrData }: IInfoPanel) => {
    return (
      <div className={cl.general} ref={generalRef}>
        {arrData.map((value, index) => (
          <div className={cl.data} key={`${value.label}${index}`}>
            <div className={cl.labels}>{value.label}</div>
            <div className={cl.info}>{value.count}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cl.container}>
      <SectionControl
        nameSection={nameSection}
        toogleContainer={toogleContainer}
        style={{ marginTop: 20 }}
        active={true}
      />

      <Data arrData={arrData} />
    </div>
  )
})
