import { IIcons } from './interfaces'
import { memo } from 'react'

export const Requests = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="RequestsIcon"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQpJREFUSEvVlc8RATEYxX86oAI6QAXogA64cqATLpypgA7oABWgAx0wbycxEdmxWXaGnDbZL+/Pt8nbEgWPUsH4pBH0gTHQyCjgAMyAlV/vE5SBbQSwjyeiDnC1L3wCFdSBCzABND+/cVEzguSgavY0QwQCnBpwteahImOb5F6CRDIAltrnOrDqe8AmI6hf1gXWrguX4GaqKznUWyK162QmCXaI4NOja4X+DsEcGAILYGTsh9Zsm6Id2A1uS0NruQkKdxB7YqNb9FMEhd8De5OPNjC/edGURXtALoJZ9PRxIhovQCWw0lTPD/VpURGB/VIq8Hba/2AHtHKiC1gOkoh2x6fB9lbP/xPcAY1ZQRmG+jOGAAAAAElFTkSuQmCC"
    />
  )
})
