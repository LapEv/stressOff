import { makeAutoObservable } from 'mobx'
import { appData } from 'data/app'
import { isEmptyObjField } from 'utils/isEmptyObjField'
import { isEqualObj } from 'utils/isEqualObj'
import {
  IActiveObj,
  ICurrentObj,
  IData,
  IMESSAGES,
  IMUSICCategories,
  IMUSICS,
  INewFile,
  INOTIFICATIONS,
  IREQUESTS,
  ISOUNDCategories,
  ISOUNDS,
  IUSERS,
} from './interfaces'
import {
  emptyActiveObj,
  emptyCurrentObj,
  emptyMessages,
  emptyCategoryMusic,
  emptyMusic,
  emptyNotification,
  emptyRequests,
  emptyCategorySound,
  emptySound,
  emptyUsers,
  emptyNewFile,
  emptyFile,
} from '../data'
import { IActiveParams } from 'components/Menu/interfaces'

export class DataStore {
  _sounds: ISOUNDS[]
  _musics: IMUSICS[]
  _soundCategories: ISOUNDCategories[]
  _musicCategories: IMUSICCategories[]
  _notifications: INOTIFICATIONS[]
  _requests: IREQUESTS[]
  _messages: IMESSAGES[]
  _requestsSort: string
  _users: IUSERS[]
  _usersSort: string
  _findUser: string
  _roles: string[]
  _listFiles: string[]
  _sizeImages: number
  _sizeSounds: number
  _imgFile: {}
  _img_ltFile: {}
  _file: File
  _newFile: INewFile
  _soundFile: {}
  _clearFile: boolean
  _activeObj: IActiveObj
  _currentObj: ICurrentObj
  _showLoading: boolean
  _showImgLoading: boolean
  _showSoundLoading: boolean
  _nullIndex: string
  _newBarIndex: string
  _isEqual: boolean
  _filePath: string

  constructor() {
    this._sounds = emptySound
    this._musics = emptyMusic
    this._soundCategories = emptyCategorySound
    this._musicCategories = emptyCategoryMusic
    this._notifications = emptyNotification
    this._requests = emptyRequests
    this._messages = emptyMessages
    this._requestsSort = 'all'
    this._users = emptyUsers
    this._usersSort = 'Все'
    this._findUser = ''
    this._roles = ['']
    this._listFiles = ['']
    this._sizeImages = 0
    this._sizeSounds = 0
    this._imgFile = {}
    this._img_ltFile = {}
    this._file = emptyFile
    this._newFile = emptyNewFile
    this._soundFile = {}
    this._clearFile = false
    this._activeObj = emptyActiveObj
    this._currentObj = emptyCurrentObj
    this._showLoading = false
    this._showImgLoading = false
    this._showSoundLoading = false
    this._nullIndex = ''
    this._newBarIndex = ''
    this._isEqual = false
    this._filePath = ''
    makeAutoObservable(this)
  }

  setSounds(data: ISOUNDS[]) {
    this._sounds = data
  }
  setMusics(data: IMUSICS[]) {
    this._musics = data
  }
  setSoundCategories(data: ISOUNDCategories[]) {
    this._soundCategories = data
  }
  setMusicCategories(data: IMUSICCategories[]) {
    this._musicCategories = data
  }
  setNotifications(data: INOTIFICATIONS[]) {
    this._notifications = data
  }
  setRequests(data: IREQUESTS[]) {
    this._requests = data
  }
  setMessages(data: IMESSAGES[]) {
    this._messages = data
  }

  setFile(data: object) {
    this._file = { ...this._file, ...data }
  }
  setFilePath(path: string) {
    this._filePath = path
  }
  setStatusClear(bool: boolean) {
    this._clearFile = bool
  }
  setEqual() {
    this._isEqual =
      isEqualObj(this._activeObj, this._currentObj) ||
      isEmptyObjField(this._currentObj, [
        'img',
        'img_lt',
        'sound',
        'description',
        'solution',
      ])
  }
  setActiveObjById({ _id }: IActiveParams) {
    console.log('_id = ', _id)
    const findElement = [
      ...this._sounds,
      ...this._musics,
      ...this._soundCategories,
      ...this._musicCategories,
      ...this._notifications,
      ...this._requests,
      ...this._messages,
      ...this._users,
    ].find(value => value._id === _id) as ISOUNDS
    console.log('findElement = ', findElement)
    const newActiveObj = {
      ...this._activeObj,
      ...findElement,
    }
    console.log('newActiveObj = ', newActiveObj)
    this._activeObj = newActiveObj
    this._isEqual = false
  }
  setActiveObj(data: IActiveObj) {
    this._activeObj = data
    this._isEqual = false
  }

  setCurrentObj(data: ICurrentObj) {
    this._currentObj = data
    this.setEqual()
  }
  setCategory(data: ISOUNDCategories[], value: string) {
    const findElement = data.find(
      item => item.title?.RUS === value,
    ) as ISOUNDCategories
    this._currentObj = {
      ...this._currentObj,
      category: findElement.category,
    }
    this.setEqual()
  }
  setLanguageOfUser(value: string) {
    const findElement = appData.languageArr.find(item => item.name === value)
    this._currentObj = {
      ...this._currentObj,
      appData: {
        ...this._currentObj.appData,
        language: findElement?.value as string,
      },
    }
  }
  setThemeOfUser(value: string) {
    const findElement = appData.themeArr.find(item => item.name === value)
    this._currentObj = {
      ...this._currentObj,
      appData: {
        ...this._currentObj.appData,
        theme: findElement?.value as string,
      },
    }
  }
  setRequestStatus(value: string) {
    const findElement = appData.statusRequestArr.find(
      item => item.name === value,
    )
    this._currentObj = {
      ...this._currentObj,
      status: findElement?.value as string,
    }
  }
  setRequestSort(value: string) {
    this._requestsSort = value
  }
  setUsersSort(value: string) {
    this._usersSort = value
  }
  setFindUser(value: string) {
    this._findUser = value
  }
  setNullIndex(bool: string) {
    this._nullIndex = bool
  }
  setNewBarIndex(id: string) {
    this._newBarIndex = id
  }
  setAllData(data: IData) {
    this._sounds = data.soundDB
    this._musics = data.musicDB
    this._soundCategories = data.soundCategoriesDB
    this._musicCategories = data.musicCategoriesDB
    this._notifications = data.notificationDB
    this._requests = data.requestDB
    this._messages = data.messagesDB
    this._users = data.usersDB
    this._listFiles = data.listFiles
    this._sizeImages = data.sizeImages
    this._sizeSounds = data.sizeSounds
    this._roles = data.rolesDB
  }
  setShowLoading(bool: boolean) {
    this._showLoading = bool
    if (!this._showImgLoading && !this._showSoundLoading && !bool) {
      this._showLoading = bool
    }
  }
  setImgShowLoading(bool: boolean) {
    this._showImgLoading = bool
    if (bool) {
      this._showLoading = bool
    }
    if (!this._showImgLoading && !this._showSoundLoading && !bool) {
      this._showLoading = bool
    }
  }
  setSoundShowLoading(bool: boolean) {
    this._showSoundLoading = bool
    if (bool) {
      this._showLoading = bool
    }
    if (!this._showImgLoading && !this._showSoundLoading && !bool) {
      this._showLoading = bool
    }
  }
  addSound(data: ISOUNDS) {
    this._sounds = [...[this._sounds], { ...data }] as ISOUNDS[]
  }
  addMusic(data: IMUSICS) {
    this._musics = [...this._musics, { ...data }]
  }
  addSoundCategory(data: ISOUNDCategories) {
    this._soundCategories = [...this._soundCategories, { ...data }]
  }
  addMusicCategory(data: IMUSICCategories) {
    this._musicCategories = [...this._musicCategories, { ...data }]
  }
  addNotification(data: INOTIFICATIONS) {
    this._notifications = [...this._notifications, { ...data }]
  }
  addUser(data: IUSERS) {
    this._users = [{ ...emptyUsers[0] }, { ...data }, ...this._users.slice(1)]
  }
  addRequest(data: IREQUESTS) {
    this._requests = [...this._requests, { ...data }]
  }
  addMessage(data: IMESSAGES) {
    this._messages = [...this._messages, { ...data }]
  }

  addFile(data: string) {
    this._listFiles.push(data)
  }
  addFolder(data: string) {
    this._listFiles.push(data)
  }
  addImageSize(bytes: number) {
    this._sizeImages += bytes
  }
  addSoundSize(bytes: number) {
    this._sizeSounds += bytes
  }
  updateSound(data: ISOUNDS) {
    this._sounds = this._sounds.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }
  updateMusic(data: IMUSICS) {
    this._musics = this._musics.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }
  updateSoundCategory(data: ISOUNDCategories) {
    this._soundCategories = this._soundCategories.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }
  updateMusicCategory(data: IMUSICCategories) {
    this._musicCategories = this._musicCategories.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }
  updateNotification(data: INOTIFICATIONS) {
    this._notifications = this._notifications.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }
  updateRequest(data: IREQUESTS) {
    this._requests = this._requests.map(value => {
      if (value.number === data.number) {
        value = data
      }
      return value
    })
  }
  updateMessages(data: IMESSAGES) {
    this._messages = this._messages.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }

  updateUser(data: IUSERS) {
    this._users = this._users.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
  }
  deleteSound(id: string) {
    this._sounds = this._sounds.filter(value => value._id !== id)
  }
  deleteMusic(id: string) {
    this._musics = this._musics.filter(value => value._id !== id)
  }
  deleteSoundCategory(id: string) {
    this._soundCategories = this._soundCategories.filter(
      value => value._id !== id,
    )
  }
  deleteMusicCategory(id: string) {
    this._musicCategories = this._musicCategories.filter(
      value => value._id !== id,
    )
  }
  deleteNotification(id: string) {
    this._notifications = this._notifications.filter(value => value._id !== id)
  }
  deleteRequest(id: string) {
    this._requests = this._requests.filter(value => value._id !== id)
  }

  get Sounds() {
    return this._sounds
  }
  get Musics() {
    return this._musics
  }
  get SoundCategories() {
    return this._soundCategories
  }
  get MusicCategories() {
    return this._musicCategories
  }
  get Notifications() {
    return this._notifications
  }
  get Requests() {
    return this._requests
  }
  get Messages() {
    return this._messages
  }
  get RequestsSort() {
    return this._requestsSort
  }
  get Users() {
    return this._users
  }
  get UsersSort() {
    return this._usersSort
  }
  get FindUser() {
    return this._findUser
  }
  get Roles() {
    return this._roles
  }
  get ListFiles() {
    return this._listFiles
  }
  get SizeImages() {
    return this._sizeImages
  }
  get SizeSounds() {
    return this._sizeSounds
  }
  get File() {
    return this._file
  }
  get ClearFile() {
    return this._clearFile
  }
  get ActiveObj() {
    return this._activeObj
  }
  get CurrentObj() {
    return this._currentObj
  }
  get showLoading() {
    return this._showLoading
  }
  get showImgLoading() {
    return this._showLoading
  }
  get showSoundLoading() {
    return this._showLoading
  }
  get NullIndex() {
    return this._nullIndex
  }
  get NewBarIndex() {
    return this._newBarIndex
  }
  get IsEqual() {
    return this._isEqual
  }
  get FilePath() {
    return this._filePath
  }
  get NewFile() {
    return this._newFile
  }
}
