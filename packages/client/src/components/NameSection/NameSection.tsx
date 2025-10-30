import { INameSection } from './interfaces'
import cl from './NameSection.module.css'

export const NameSection = ({ title, id, style }: INameSection) => {
  return (
    <div className={cl.nameSection} style={style}>
      <div>{title}</div>
      {id && <div>{id}</div>}
    </div>
  )
}
