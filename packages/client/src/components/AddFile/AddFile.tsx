import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import cl from './AddFile.module.css'
import { Context } from '../../main'
import { appData } from 'data/app'
import { MODAL } from 'data/modal'
import { IAddFile } from './interfaces'
import { IFileImage } from 'pages/Sounds/SoundsData/interfaces'

export const AddFile = observer((props: IAddFile) => {
  const { data, modal } = useContext(Context)
  const { containerwidth, onChooseFile, tabIndex, obj } = props
  const refInput = useRef<HTMLInputElement>(null)

  const ChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    data.setShowLoading(true)

    const reader = new FileReader()
    const fileList = e.target.files as FileList
    reader.onloadend = () => {
      onChooseFile({
        status: true,
        data: { info: fileList[0], data: reader.result as string },
      } as IFileImage)
      data.setShowLoading(false)
    }
    if (fileList[0].size >= appData.maxSizeForFileUpload) {
      data.setShowLoading(false)
      modal.setShowModal(
        MODAL.modalMessageTitle.attention,
        `${MODAL.modalMessages.maxSizeForFileUpload}${(
          fileList[0].size / 100000
        ).toFixed(2)}Mb`,
      )
      return
    }
    if (fileList[0]) {
      reader.readAsDataURL(fileList[0])
    }
  }

  useEffect(() => {
    if (refInput.current) {
      refInput.current.value = ''
    }
  }, [data.ClearFile])

  return (
    <div className={cl.addFileContainer} style={containerwidth}>
      {props.label}
      <div className={cl.chooseContainer}>
        <label htmlFor={obj} className={cl.label} tabIndex={tabIndex}>
          {appData.buttons.choose}
        </label>
        <input
          ref={refInput}
          type="file"
          id={obj}
          accept={props.accept}
          name="image_uploads"
          style={{ width: 0, height: 0, opacity: 0 }}
          onChange={e => ChooseFile(e)}
        />
        <div className={cl.fileText}>
          {refInput.current?.value.split(/(\\|\/)/g).pop()}
        </div>
      </div>
    </div>
  )
})
