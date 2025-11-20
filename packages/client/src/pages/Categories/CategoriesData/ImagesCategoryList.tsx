import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import {
  IFile,
  IFileImage,
  IImagesList,
} from '../../Sounds/SoundsData/interfaces'
import { GetImage } from 'functions/getImage'
import { appData } from 'data/app'
import { AddFile } from 'components/AddFile/AddFile'
import { Preview } from 'components/Preview/Preview'
import { DropDownCategoryData } from './DropDownCategoryData'

export const ImagesCategoryList = observer(
  ({ type, obj, tabIndex }: IImagesList) => {
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
      GetFileImage(
        data.ActiveCategoryObj[
          obj as keyof typeof data.ActiveCategoryObj
        ] as string,
      )
      return
    }, [data.ActiveCategoryObj])

    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {data.ActiveCategoryObj._id !== '01' &&
        data.ActiveCategoryObj._id !== '02' ? (
          <DropDownCategoryData
            required
            tabIndex={tabIndex}
            placeholder={appData.placeholders.required}
            label={
              obj === 'imgStorage'
                ? appData.adminLabel.img
                : appData.adminLabel.img_lt
            }
            containerwidth={{ width: '75%' }}
            type={type}
            main={obj}
            getFileImg={GetFileImage}
          />
        ) : (
          <AddFile
            accept="image/*"
            label={
              obj === 'imgStorage'
                ? appData.adminLabel.img
                : appData.adminLabel.img_lt
            }
            containerwidth={{ width: '75%' }}
            tabIndex={tabIndex}
            obj={obj}
            onChooseFile={(file: IFileImage) => (
              data.setFile({ [obj]: file }),
              setFile(file),
              data.setCurrentCategoryObj({
                ...data.CurrentCategoryObj,
                [obj]: file.data.info.name,
              })
            )}
          />
        )}
        <Preview file={file?.data as IFile} />
      </div>
    )
  },
)
