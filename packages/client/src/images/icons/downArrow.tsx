import { IIcons } from './interfaces'
import { memo } from 'react'

export const DownArrow = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="DownArrow"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAT5JREFUSEvtlOExBEEQhb+LgAwQASJABMjgMkAEiAAhiAARIAInAmRABuq76tm6uhuzvar2hyr9Z2t3e97rfv16Jowck5Hx+SfoVXhRohmw3XsilyDWrqljEbwCO8sEfniJAg+Ap1yxXdY+8BhvVm8XKy66AM6B92jxM0myHsVtApeAOPOo2bTM4h44ThKYewg8A3bSRY3AKiRZCwIPt+IIuAO+Qne7bxL48xS4ApRoK541EqV5A3yeAdfLSa1Ndsh7MWyHXouS8wDYyUq0CKzKdpWqVl3pUmmUtWqIvruo6OthrVf0FVBLW4RG+HFOfQS2XBzSbWeYwK2/BaYtB2QIrFLwjfC4eO7KR7imuSsZAgEXt7QUnNr2LIGgWvAk0G/Cyr17OIRAqcr9NL/IMjGEIIM3aA9+BThkk/8GwTcJ2TYZqCLviwAAAABJRU5ErkJggg=="
    />
  )
})
