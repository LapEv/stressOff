import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import cl from '../General.module.css'
import { isEqualArr } from 'functions/isEqualArr'
import { appData } from 'data/app'
import { FileManager } from './FilesData/FileManager'

export const Files = observer(() => {
  const { data } = useContext(Context)
  const arrListFiles = data.ListFiles.map(value => value.split('\\'))
    .map(value => value.slice(1, value.length))
    .filter((item, index, arr) => !isEqualArr(item, arr[index - 1]))
    .sort()

  useEffect(() => {
    data.setFilePath('')
    data.setFile({ addNewFile: {} })
    data.setStatusClear(false)
  }, [data.ClearFile])

  return (
    <div className={cl.general} style={{ padding: 30 }}>
      <div className={cl.panelsUpload}>
        {appData.fileLabels.chooseFolder}
        <FileManager arrListFiles={arrListFiles} />
      </div>
    </div>
  )
})
