import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from './fileManager.module.css'
import { createNewFolder, getFile } from 'api/dataAPI'
import { MODAL } from 'data/modal'
import { IFile, IFileListControl } from '../interfaces'
import { Button, Preview } from 'components'
import { errorHandler } from 'utils/errorHandler'
import { AxiosError } from 'axios'
import { appData } from 'data/app'

export const FileListControl = observer(({ newFolder }: IFileListControl) => {
  const { data, modal } = useContext(Context)
  const [file, setFile] = useState<IFile>()
  const [styleContainer, setStyleContainer] = useState<string>()

  const GetFile = async (file: string) => {
    data.setShowLoading(true)
    const fileData = (await getFile({ name: file })) as IFile
    setFile(fileData)
    if (fileData && fileData.info) {
      const style = fileData.info.type.includes('image')
        ? cl.fileImgContainer
        : cl.fileSoundContainer
      setStyleContainer(style)
    }
    data.setShowLoading(false)
  }

  const onlyDirectory = (path: string) => {
    const newpath = path.split('\\')
    newpath.pop()
    return newpath.join('\\')
  }

  const pressCreateFolder = () => {
    if (!data.FilePath) {
      modal.setShowModal(
        MODAL.modalMessageTitle.error,
        MODAL.modalMessages.createFolderError,
      )
      return
    }
    const path = data.FilePath.includes('.')
      ? onlyDirectory(data.FilePath)
      : data.FilePath
    modal.setShowQuestionInputModal({
      title: MODAL.modalMessageTitle.attention,
      description: `${MODAL.modalMessages.createFolder} "${path}"`,
      type: MODAL.modalType.createFolder,
      request: '',
    })
  }

  const createFolder = async () => {
    const path = `${
      data.FilePath.includes('.')
        ? `${onlyDirectory(data.FilePath)}`
        : data.FilePath
    }\\${modal.inputText}`
    data.setShowLoading(true)

    try {
      const response = await createNewFolder({ path: path })
      data.setFilePath(path)
      newFolder(path)
      data.addFolder(`\\${path}`)
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
    if (data.FilePath.includes('.')) {
      const file = data.FilePath.split('\\')
      GetFile(file[file.length - 1])
      // } else {
      //   setFile({data: '', info: ''})
    }
  }, [data.FilePath])

  useEffect(() => {
    newFolder('')
  }, [data.ClearFile])

  useEffect(() => {
    if (modal.response && modal.type === MODAL.modalType.createFolder) {
      createFolder()
    }
  }, [modal.response])

  return (
    <div className={cl.fileContainer}>
      <div className={cl.fileContainerLeft}>
        <Button
          tabIndex={2}
          style={{
            ...appData.buttons.style,
            width: '8%',
            minWidth: 110,
            maxWidth: 200,
            height: 'calc(1.5rem + 2.5vh)',
          }}
          onClick={pressCreateFolder}>
          {appData.buttons.createDir}
        </Button>
        <div
          className={cl.fileText}
          style={{
            width: '100%',
          }}>
          {data.FilePath}
        </div>
      </div>
      <Preview
        file={file as IFile}
        style={{ height: 'calc(1.5rem + 2.5vh)' }}
        clContainer={styleContainer}
      />
    </div>
  )
})
