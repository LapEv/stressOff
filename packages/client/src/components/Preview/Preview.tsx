import cl from './preview.module.css'
import { IPreview } from './interfaces'
import { SoundControl } from 'components/SoundControl/SoundControl'
import { memo } from 'react'

export const Preview = memo(({ file, style, styleContainer }: IPreview) => {
  if (!file || !file?.info.type || file?.info?.type === '') return <></>
  if (file?.info?.type.includes('image')) {
    return (
      <div className={cl.imgContainer} style={styleContainer}>
        {file.data && <img src={file.data} />}
      </div>
    )
  }
  if (file?.info?.type.includes('audio')) {
    return (
      <SoundControl
        sound={file}
        style={style}
        styleContainer={styleContainer}
      />
    )
  }
})
