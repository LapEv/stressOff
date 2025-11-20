import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { IFile, IFileImage, ISoundList } from './interfaces'
import { DropDownData } from './DropDownData'
import { appData } from 'data/app'
import { Preview } from 'components/Preview/Preview'
import { GetSound } from 'functions'
import { AddFile } from 'components/AddFile/AddFile'

export const SoundsList = observer(({ type, tabIndex }: ISoundList) => {
  const { data } = useContext(Context)
  const [file, setFile] = useState<IFileImage>()

  const GetFileSound = async (sound: string) => {
    data.setSoundShowLoading(true)
    const fileData = (await GetSound(sound)) as IFileImage
    setFile(fileData)
    if (fileData.status) {
      data.setFile({ storage: fileData.data })
    }
    data.setSoundShowLoading(false)
  }

  useEffect(() => {
    GetFileSound(data.ActiveObj.storage)
  }, [data.ActiveObj])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
      {data.ActiveObj.id !== '0' ? (
        <DropDownData
          required
          tabIndex={tabIndex}
          placeholder={appData.placeholders.required}
          label={appData.adminLabel.sound}
          containerwidth={{ width: '100%' }}
          type={type}
          main="storage"
          id={`SoundsList_${data.ActiveObj.id}`}
          getFileSound={GetFileSound}
        />
      ) : (
        <AddFile
          label={appData.adminLabel.sound}
          accept="audio/*"
          containerwidth={{ width: '100%' }}
          tabIndex={tabIndex}
          obj={'storage'}
          onChooseFile={(file: IFileImage) => (
            data.setFile({ storage: file }),
            setFile(file),
            data.setCurrentObj({
              ...data.CurrentObj,
              storage: file.data.info.name,
            })
          )}
        />
      )}
      <Preview
        file={file?.data as IFile}
        styleContainer={{
          width: '100%',
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 10,
        }}
      />
    </div>
  )
})
