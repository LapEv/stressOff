import { IIcons } from './interfaces'
import { memo } from 'react'
import cl from './icons.module.css'

export const Folder = memo((props: IIcons) => {
  return (
    <img
      {...props}
      className={cl.Folder}
      style={props.style}
      alt="Folder"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJhJREFUSEvtld0NgCAMhD8mcAR1E91EJ9NRHMERdAM30NREQ4w/laQ8wSvlrncUzmG8nDE+UQkqoAOKi6oRqIElRK2vYALyB5BgEp9gDenw5ow02gKD7FkQCK6QlJYEJ7aVgkSgmrfd/nQHb14liz4nKb5F8t9nn33pCuYjV/x3IIHTv2SCDhoEvLn7rrUAv+qiZvKvzrTFG10RHBlNaO9UAAAAAElFTkSuQmCC"
    />
  )
})
