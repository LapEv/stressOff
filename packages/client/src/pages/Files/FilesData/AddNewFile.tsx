import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import { appData } from 'data/app'
import { AddFile, Preview } from 'components'
import { IAddNewFile, IFile } from '../interfaces'
import { IFileImage } from 'pages/Sounds/SoundsData/interfaces'

export const AddNewFile = observer(({ obj }: IAddNewFile) => {
  const { data } = useContext(Context)
  const [file, setFile] = useState<IFileImage | null>()

  useEffect(() => {
    setFile(null)
  }, [data.ClearFile])

  return (
    <div
      className={cl.panels}
      style={{ height: '15%', marginTop: 0, paddingTop: 0, paddingBottom: 0 }}>
      <AddFile
        label={appData.adminLabel.chooseFile}
        tabIndex={3}
        obj={obj}
        containerwidth={{
          width: '95%',
          padding: 0,
          marginLeft: 20,
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        accept="image/*,audio/*"
        onChooseFile={(file: IFileImage) => (
          data.setFile({ [obj]: file }),
          setFile(file)
        )}
      />
      <Preview
        file={file?.data as IFile}
        styleContainer={
          file?.data.info?.type.includes('audio')
            ? { marginTop: 50, marginLeft: 10, width: 350 }
            : { marginTop: 15, marginLeft: 10 }
        }
      />
    </div>
  )
})
