import { memo } from 'react'
import cl from './soundControl.module.css'
import { ISoundControl } from './interfaces'

export const SoundControl = memo(
  ({ sound, style, styleContainer }: ISoundControl) => {
    return (
      <div className={cl.audioContainer} style={styleContainer}>
        <audio
          style={style}
          controls
          controlsList="nodownload noplaybackrate"
          src={sound.data}></audio>
      </div>
    )
  },
)
