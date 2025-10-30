import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import cl from './preview.module.css'
import { Context } from '../../main'
import { SoundControl } from 'components/SoundControl/SoundControl'
import { IPreviewNewFile } from './interfaces'

export const PreviewNewFile = observer(
  ({ style, styleContainer }: IPreviewNewFile) => {
    const { data } = useContext(Context)

    if (data.NewFile?.info?.type.includes('image')) {
      return (
        <div className={cl.imgContainer}>
          {data.NewFile.data && <img src={data.NewFile.data} />}
        </div>
      )
    }
    if (data.NewFile?.info?.type.includes('audio')) {
      return (
        <SoundControl
          sound={data.NewFile}
          style={style}
          styleContainer={styleContainer}
        />
      )
    }
  },
)
