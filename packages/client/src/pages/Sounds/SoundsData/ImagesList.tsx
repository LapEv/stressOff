import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { IFile, IFileImage, IImagesList } from './interfaces'
import { GetImage } from 'functions/getImage'
import { appData } from 'data/app'
import { DropDownData } from './DropDownData'
import { AddFile } from 'components/AddFile/AddFile'
import { Preview } from 'components/Preview/Preview'

export const ImagesList = observer(({ type, obj, tabIndex }: IImagesList) => {
  const { data } = useContext(Context)
  const [file, setFile] = useState<IFileImage>()

  const GetFileImage = async (imgStorage: string) => {
    data.setImgShowLoading(true)
    const fileData = (await GetImage(imgStorage)) as IFileImage
    setFile(fileData)
    data.setFile({ [obj]: fileData.data })
    data.setImgShowLoading(false)
  }

  useEffect(() => {
    GetFileImage(data.ActiveObj[obj as keyof typeof data.ActiveObj] as string)
  }, [data.ActiveObj])

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {data.ActiveObj.id !== '0' ? (
        <DropDownData
          required
          tabIndex={tabIndex}
          placeholder={appData.placeholders.required}
          label={appData.adminLabel.img}
          containerwidth={{ width: '75%' }}
          type={type}
          main={obj}
          getFileImg={GetFileImage}
          id={`ImagesList_${data.ActiveObj.id}`}
        />
      ) : (
        <AddFile
          accept="image/*"
          label={appData.adminLabel.img}
          containerwidth={{ width: '75%' }}
          tabIndex={tabIndex}
          obj={obj}
          onChooseFile={(file: IFileImage) => (
            data.setFile({ [obj]: file }),
            setFile(file),
            data.setCurrentObj({
              ...data.CurrentObj,
              [obj]: file.data.info.name,
            })
          )}
        />
      )}
      <Preview file={file?.data as IFile} />
    </div>
  )
})
