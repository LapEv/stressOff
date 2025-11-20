import { useContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import Scrollbar from 'react-scrollbars-custom'
import { isEqualArr } from '../../../functions/isEqualArr'
import cl from './fileManager.module.css'
import { File, Folder } from 'images'
import { IFileManager, IFolders } from './interfaces'
import { AddNewFile } from './AddNewFile'
import { ButtonsGroupFile } from './ButtonsGroupFile'
import { FileListControl } from './FileListControl'

export const FileManager = observer(({ arrListFiles }: IFileManager) => {
  const { data } = useContext(Context)
  const refFolder = useRef('')
  const refContainer = useRef<HTMLDivElement>(null)

  const newFolder = (path: string) => {
    refFolder.current = path
  }

  const ChooseFolder = (event: React.MouseEvent) => {
    if (event.currentTarget.children.length <= 0) return

    const pressActiveFolder = Array.from(
      event.currentTarget.children,
    )[0].className.includes('currentFolder')

    if (!pressActiveFolder) {
      Array.from(event.currentTarget.parentNode!.children).map(value => {
        if (value.className.includes('folder')) {
          Array.from(value.children).map(value => {
            if (value.className.includes('folderActive')) {
              value.classList.toggle(`${cl.folderActive}`)
            }
            if (value.className.includes('currentFolder')) {
              value.classList.toggle(`${cl.currentFolder}`)
            }
          })
        }
      })
    }
    Array.from(event.currentTarget.children).map(value => {
      if (value.className.includes('folder')) {
        value.classList.toggle(`${cl.folderActive}`)
      }
      if (value.className.includes('container')) {
        value.classList.toggle(`${cl.currentFolder}`)
      }
    })

    event.stopPropagation()

    function searchFolderPath(path: string, element: Element[]) {
      Array.from(element).forEach(value => {
        if (value.children[0].className.includes('currentFolder')) {
          path +=
            path === ''
              ? value.children[0].textContent
              : `\\${value.children[0].textContent}`
          path = searchFolderPath(path, Array.from(value.children))
        }
      })
      return path
    }

    const path = searchFolderPath(
      '',
      Array.from(refContainer.current!.children),
    )
    refFolder.current = path
    data.setFilePath(path)
  }

  const Folders = ({ array, path, active }: IFolders) => {
    return array.map((value, index, arr) => {
      const firstFolders = isEqualArr(array, arrListFiles) ? true : false
      const newElement =
        index === 0 || value[0] !== arr[index - 1][0] ? true : false
      const file = value[0].includes('.')
      if (newElement) {
        const pathClass = !path ? `${value[0]}` : `${path}\\${value[0]}`
        const activeFolder = refFolder.current
          ? refFolder.current.includes(pathClass)
          : false
        return (
          <div
            className={`${cl.folder} ${
              firstFolders || activeFolder || active ? cl.folderActive : ''
            } ${pathClass}`}
            key={`${value}${index}`}
            onClick={e => ChooseFolder(e)}>
            <div
              className={`${cl.container} ${
                activeFolder ? cl.currentFolder : ''
              }`}>
              {!file && (
                <Folder
                  style={{
                    width: 'calc(0.8rem + 1.6vh)',
                    height: 'calc(0.8rem + 1.6vh)',
                    zIndex: 1,
                  }}
                  onClick={e => ChooseFolder(e)}
                />
              )}
              {file && (
                <File
                  style={{
                    width: 'calc(0.8rem + 1.6vh)',
                    height: 'calc(0.8rem + 1.6vh)',
                    zIndex: 1,
                    filter: 'invert(1)',
                  }}
                  onClick={e => ChooseFolder(e)}
                />
              )}
              {value[0]}
            </div>
            {value.length > 1 && (
              <Folders
                array={arr
                  .filter(item => item[0] === value[0])
                  .map(item => item.slice(1, value.length))}
                path={!path ? value[0] : `${path}\\${value[0]}`}
                active={activeFolder}
              />
            )}
          </div>
        )
      }
    })
  }

  return (
    <div className={cl.fileManagerContainer}>
      <Scrollbar style={{ marginTop: 10 }}>
        <div className={cl.foldersContainer} ref={refContainer}>
          <Folders array={arrListFiles} path={''} active={false} />
        </div>
      </Scrollbar>
      <FileListControl newFolder={newFolder} />
      <AddNewFile obj="addNewFile" />
      <ButtonsGroupFile newFolder={newFolder} obj="addNewFile" />
    </div>
  )
})
