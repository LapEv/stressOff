import { IIcons } from './interfaces'
import { memo } from 'react'

export const File = memo((props: IIcons) => {
  return (
    <img
      {...props}
      style={props.style}
      alt="File"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMVJREFUSEvtleERAUEMRt9VgArowKgAneiMUpRAB3SgAybmzqy93CZ27WDG/dxLvpfNl7s0VH6ayvpogBWwBWYJ+AFYAxerQA1wAqZWIuCCaIBrKz7Uvu69hJmQEsARmFuQEsAE2FuQEoDkji2IBxB7EnoQz4J4sggPcwDSlmViyp40PQDHxN5D1On7CkCq51J5V2T2DaoD/h70OvDKh/UWk3/PA9lSI2/ZUdw53oRDK3Pn3Gqhvohv2r/r4/wjSz+zO3raDTzEPRmj6DYvAAAAAElFTkSuQmCC"
    />
  )
})
