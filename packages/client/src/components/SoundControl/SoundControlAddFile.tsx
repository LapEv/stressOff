import { memo } from 'react'
import cl from './soundControl.module.css'
import { ISoundControl } from './interfaces'

export const SoundControlAddFile = memo(
  ({ sound, style, styleContainer }: ISoundControl) => {
    return (
      <div className={cl.audioContainer} style={styleContainer}>
        <audio style={style} controls controlsList="nodownload noplaybackrate">
          <source src={sound.data} type="audio/ogg; codecs=vorbis" />
        </audio>
      </div>
    )
  },
)
