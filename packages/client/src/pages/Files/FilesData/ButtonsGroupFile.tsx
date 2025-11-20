import { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { Clean, Save } from 'images'
import cl from '../../General.module.css'
import { MODAL } from 'data/modal'
import { IButtonsGroupFile } from '../interfaces'
import { uploadFile } from 'api/dataAPI'
import { api } from 'api/api'
import { errorHandler } from 'utils/errorHandler'
import { AxiosError } from 'axios'
import { Button } from 'components'
import { appData } from 'data/app'

export const ButtonsGroupFile = observer(
  ({ newFolder, obj }: IButtonsGroupFile) => {
    const { data, modal } = useContext(Context)
    const buttonClasses = [cl.buttonsPanel]
    buttonClasses.push(cl.buttonsPanelUpload)

    const pressUpload = () => {
      if (!data.FilePath) {
        modal.setShowModal(
          MODAL.modalMessageTitle.error,
          MODAL.modalMessages.folderError,
        )
        return
      }

      const path = data.FilePath.includes('.')
        ? onlyDirectory(data.FilePath)
        : data.FilePath
      modal.setShowQuestionModal({
        title: MODAL.modalMessageTitle.attention,
        description: `${MODAL.modalMessages.saveFile} "${data.File[obj].info.name}" ${MODAL.modalMessages.saveFileFolder} "${path}"?`,
        type: MODAL.modalType.saveFile,
        request: '',
      })
    }

    const pressClear = () => {
      data.setFilePath('')
      data.setFile({})
      data.setStatusClear(true)
    }

    const onlyDirectory = (path: string) => {
      const newpath = path.split('\\')
      newpath.pop()
      return newpath.join('\\')
    }

    const upload = async () => {
      const path = data.FilePath.includes('.')
        ? onlyDirectory(data.FilePath)
        : data.FilePath
      data.setShowLoading(true)
      try {
        const response = await uploadFile(
          api.UPLOAD_FILE,
          data.File[obj].info,
          {
            type: '',
            category: '',
            directory: '',
            path: path,
          },
        )
        data.addFile(`\\${path}\\${data.File[obj].info.name}`)
        data.File[obj].info.type.includes('image')
          ? data.addImageSize(data.File[obj].info.size)
          : data.addSoundSize(data.File[obj].info.size)
        data.setFilePath(`${path}\\${data.File[obj].info.name}`)
        newFolder(`${path}\\${data.File[obj].info.name}`)
        data.setFile({})
        data.setShowLoading(false)
        modal.setShowModal(
          MODAL.modalMessageTitle.attention,
          response.message.RUS,
        )
      } catch (err) {
        const error = errorHandler(err as AxiosError)
        const language = data.CurrentUserObj.appData.language
        const newError =
          error instanceof Object
            ? error.message[language as keyof typeof error.message]
            : error
        data.setShowLoading(false)
        modal.setShowModal(MODAL.modalMessageTitle.error, newError)
      }
    }

    useEffect(() => {
      if (modal.response && modal.type === MODAL.modalType.saveFile) {
        upload()
      }
    }, [modal.response])

    return (
      <div className={cl.buttonsPanel} style={{ height: '5%' }}>
        <Button
          style={{
            ...appData.buttons.style,
          }}
          onClick={pressClear}
          tabIndex={5}>
          <div className={cl.buttonImg}>
            <Clean style={{ width: '85%', height: '85%' }} />
          </div>
          {appData.buttons.clear}
        </Button>
        <Button
          style={{
            opacity: data.File[obj]?.data ? 1 : 0.6,
            ...appData.buttons.style,
          }}
          onClick={pressUpload}
          disabled={data.File[obj]?.data ? false : true}
          tabIndex={6}>
          <div className={cl.buttonImg}>
            <Save style={{ width: '85%', height: '85%' }} />
          </div>
          {appData.buttons.save}
        </Button>
      </div>
    )
  },
)
