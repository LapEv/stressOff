import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import { IFile, IFileImage, IImagesList } from './interfaces'
import { GetImage } from 'functions/getImage'
import { appData } from 'data/app'
import { DropDownData } from './DropDownData'
import { AddFile } from 'components/AddFile/AddFile'
import { Preview } from 'components/Preview/Preview'

export const ImagesList = observer(({ type, obj, tabIndex }: IImagesList) => {
  const { data } = useContext(Context)

  const GetFileImage = async (imgStorage: string) => {
    data.setImgShowLoading(true)
    const fileData = (await GetImage(imgStorage)) as IFileImage
    if (fileData.status) {
      data.setFile({ [obj]: fileData.data })
    }
    data.setImgShowLoading(false)
  }

  useEffect(() => {
    GetFileImage(data.ActiveObj[obj as keyof typeof data.ActiveObj] as string)
  }, [data.ActiveObj])

  console.log('data.File = ', data.File)
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {data.ActiveObj.id ? (
        <DropDownData
          required
          tabIndex={tabIndex}
          placeholder={appData.placeholders.required}
          label={appData.adminLabel.img}
          containerwidth={{ width: '75%' }}
          type={type}
          main={obj}
          getFileImg={GetFileImage}
        />
      ) : (
        <AddFile
          accept="image/*"
          label={appData.adminLabel.img}
          containerwidth={{ width: '75%' }}
          tabIndex={tabIndex}
          obj={obj}
          onChooseFile={(file: IFile) => (
            data.setFile({ [obj]: file }),
            data.setCurrentObj({
              ...data.CurrentObj,
              [obj]: file.info.name,
            })
          )}
        />
      )}
      <Preview file={data.File as File} />
    </div>
  )
})
