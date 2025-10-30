import { IIcons } from './interfaces'
import { memo } from 'react'

export const Clean = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="Clean"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJxJREFUSEvtleENQDAQhb9OYARsYhQmwSSMYhQ2sAFpoiJXXGj41f5r+u6+10ubZ/h4mY/7owEaoFZMtIDVnS4JKIAOyF7ebAQqYHD1EmAF6cvmrsz2yK8Ay3bgwG6vMaV+Ny5v8DtAcy7PpUHvFXmCh4QIUAcWRxRHBPGjqf9gBhL1rdwLpmNgnSVaHxA6tnl5l2iB5v1yLfSDgSuNnCwZEfSwhgAAAABJRU5ErkJggg=="
    />
  )
})
