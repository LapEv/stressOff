import cl from './preview.module.css'
import { IPreview } from './interfaces'
import { SoundControl } from 'components/SoundControl/SoundControl'
import { memo } from 'react'
import { SoundControlAddFile } from 'components/SoundControl/SoundControlAddFile'

export const Preview = memo(
  ({ file, style, styleContainer, clContainer }: IPreview) => {
    if (!file || !file.data || !file.info) {
      return <></>
    }

    if (file?.info?.type.includes('image')) {
      return (
        <div className={clContainer}>
          <div className={cl.imgContainer} style={styleContainer}>
            {file.data && <img src={file.data} />}
          </div>
        </div>
      )
    }

    if (file?.data.includes('base64')) {
      return (
        <div className={clContainer}>
          <SoundControlAddFile
            sound={file}
            style={style}
            styleContainer={styleContainer}
          />
        </div>
      )
    }

    if (file?.info?.type.includes('audio')) {
      return (
        <div className={clContainer}>
          <SoundControl
            sound={file}
            style={style}
            styleContainer={styleContainer}
          />
        </div>
      )
    }
    return <></>
  },
)
