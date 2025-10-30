import { IIcons } from './interfaces'
import { memo } from 'react'

export const Save = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="Save"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANJJREFUSEvtlWENwkAMRt8cgAIkABJwgBRQAJKQgARwAArAAaTJlSzd3boCt4SE/btu7bu2X9eGyk9TOT6jA9bADlgEMjsBK+Ce87EZXIBZILh+WoRYwCN5qF3PGsjap8ARmANZyKcA8Z/0QaIAWz31t5ClTVnPXolKALEL5GZK3JGpBUT73fH3SvT7AG/wZG62wCGlGi7RkMET/atqwgCv6SXVvXrrNfkPcAft6yUaohpv+M7tfWKbLLrfp9+vFyj3/gpsWnMx/sp859a9PtWX/hNUrkEZI5OABgAAAABJRU5ErkJggg=="
    />
  )
})
