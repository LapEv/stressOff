import { IIcons } from './interfaces'
import { memo } from 'react'

export const Send = memo((props: IIcons) => {
  return (
    <img
      {...props}
      alt="Send"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVtJREFUSEu9lQFNA0EQRV8VgAPAQVEADsABOKAOAAWAA3AADkAB1AE4AAfkkZ1ms9m92164TtKkuez9P///mb0FM9diZnx2TvAB7AE3wNN/qCsVfCcCsT+BR+AB8PmkKgmegTPgJyMS/H4qUUmwAu6SPXavVSepdYls4Dap61JUEiyB9wRwlBBOAYlVFiV5F1FtiiIHCcwh6jApusieqciMXltyagSRgy/ZZflyEJ1nObXOVvcgcoimWi/vJ+s872hbjrkDsRnxmoLIoVQ9RnQJHGREx/7fhuAtZVBappIrQALts9aAjXZZNAasRZIEsBY5ZX81FHIL2C6vAUMO4NbZKsHQmAqsFVEvKdTuMY2AvzI/XTQ9tuMop8Qtz/ekugpjV4UdS2B5P7kjXcCtDGLJtCn8Fdjg/G19qw5d19rkNEwCbilwE+1cGzajVjW38+HOP5mdffUfm13BL3LqWBmPM/D+AAAAAElFTkSuQmCC"
    />
  )
})
