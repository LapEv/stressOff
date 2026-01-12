import { makeAutoObservable } from 'mobx'
import { appData } from 'data/app'
import { isEmptyObjField } from 'utils/isEmptyObjField'
import { isEqualObj } from 'utils/isEqualObj'
import {
  IActiveCategoryObj,
  IActiveObj,
  ICurrentCategoryObj,
  ICurrentObj,
  IData,
  IFile,
  IMESSAGES,
  IMUSICCategories,
  IMUSICS,
  INewFile,
  INotificationObj,
  INOTIFICATIONS,
  IREQUESTS,
  IRoles,
  ISOUNDCategories,
  ISOUNDS,
  IUserObj,
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
  emptyActiveCategoryObj,
  emptyCurrentCategoryObj,
  emptyCurrentRequest,
  emptyRoles,
  emptyCurrentUserLP,
  emptyNotificationObj,
  emptyCurrentMessage,
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
  _roles: IRoles[]
  _listFiles: string[]
  _sizeImages: number
  _sizeSounds: number
  _imgFile: INewFile
  _img_ltFile: INewFile
  _file: IFile
  _newFile: INewFile
  _soundFile: INewFile
  _clearFile: boolean
  _activeObj: IActiveObj
  _currentObj: ICurrentObj
  _activeCategoryObj: IActiveCategoryObj
  _currentCategoryObj: ICurrentCategoryObj
  _activeUserObj: IUserObj
  _currentUserObj: IUserObj
  _activeNotificationObj: INotificationObj
  _currentNotificationObj: INotificationObj
  _activeRequestObj: IREQUESTS
  _currentRequestObj: IREQUESTS
  _activeMessageObj: IMESSAGES
  _currentMessageObj: IMESSAGES
  _showLoading: boolean
  _showImgLoading: boolean
  _showSoundLoading: boolean
  _nullIndex: string
  _newBarIndex: string
  _isEqual: boolean
  _isEqualCategory: boolean
  _isEqualUser: boolean
  _isEqualNotification: boolean
  _isEqualRequest: boolean
  _isEqualMessage: boolean
  _filePath: string
  _activeWindow: string
  _deleteIndex: boolean

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
    this._roles = emptyRoles
    this._listFiles = ['']
    this._sizeImages = 0
    this._sizeSounds = 0
    this._imgFile = emptyNewFile
    this._img_ltFile = emptyNewFile
    this._file = emptyFile
    this._newFile = emptyNewFile
    this._soundFile = emptyNewFile
    this._clearFile = false
    this._activeObj = emptyActiveObj
    this._currentObj = emptyCurrentObj
    this._activeCategoryObj = emptyActiveCategoryObj
    this._currentCategoryObj = emptyCurrentCategoryObj
    this._activeUserObj = emptyCurrentUserLP
    this._currentUserObj = emptyCurrentUserLP
    this._activeNotificationObj = emptyNotificationObj
    this._currentNotificationObj = emptyNotificationObj
    this._activeRequestObj = emptyCurrentRequest
    this._currentRequestObj = emptyCurrentRequest
    this._activeMessageObj = emptyCurrentMessage
    this._currentMessageObj = emptyCurrentMessage
    this._showLoading = false
    this._showImgLoading = false
    this._showSoundLoading = false
    this._nullIndex = ''
    this._newBarIndex = ''
    this._isEqual = false
    this._isEqualCategory = false
    this._isEqualUser = false
    this._isEqualNotification = false
    this._isEqualRequest = false
    this._isEqualMessage = false
    this._filePath = ''
    this._activeWindow = ''
    this._deleteIndex = false
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
  setEqualObj() {
    this._isEqual =
      isEqualObj(this._activeObj, this._currentObj) ||
      isEmptyObjField(this._currentObj, [
        '_id',
        'id',
        'img',
        'sound',
        'description',
        '__v',
      ])
  }

  setEqualCategory() {
    this._isEqualCategory = isEqualObj(
      this._activeCategoryObj,
      this._currentCategoryObj,
    )
  }

  setEqualUser() {
    this._isEqualUser = isEqualObj(this._activeUserObj, this._currentUserObj)
  }

  setEqualNotification() {
    this._isEqualNotification = isEqualObj(
      this._activeNotificationObj,
      this._currentNotificationObj,
    )
  }

  setEqualRequest() {
    this._isEqualNotification = isEqualObj(
      this._activeRequestObj,
      this._currentRequestObj,
    )
  }

  setEqualMessage() {
    this._isEqualMessage = isEqualObj(
      this._activeMessageObj,
      this._currentMessageObj,
    )
  }

  setActiveObjById({ _id }: IActiveParams) {
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
    const newActiveObj = {
      ...this._activeObj,
      ...findElement,
    }
    this._activeObj = newActiveObj
    this._isEqual = false
  }

  setActiveObjSoundById({ _id }: IActiveParams) {
    const findElement = [...this._sounds].find(
      value => value._id === _id,
    ) as ISOUNDS
    const newActiveObj = {
      ...this._activeObj,
      ...findElement,
    }
    this._activeObj = newActiveObj
    this._isEqual = false
  }

  setActiveObjMusicById({ _id }: IActiveParams) {
    const findElement = [...this._musics].find(
      value => value._id === _id,
    ) as IMUSICS
    const newActiveObj = {
      ...this._activeObj,
      ...findElement,
    }
    this._activeObj = newActiveObj
    this._isEqual = false
  }

  setActiveCategoryObjById({ _id }: IActiveParams) {
    const findElement = [
      ...this._soundCategories,
      ...this._musicCategories,
    ].find(value => value._id === _id)
    const newActiveObj = {
      ...this._activeCategoryObj,
      ...findElement,
    }
    this._activeCategoryObj = newActiveObj
    this._currentCategoryObj = newActiveObj
    this._isEqualCategory = false
  }

  setActiveObjUsersById({ _id }: IActiveParams) {
    const findElement = this._users.find(value => value._id === _id)
    const newActiveObj = {
      ...this._activeUserObj,
      ...findElement,
    }
    this._activeUserObj = newActiveObj
    this._currentUserObj = newActiveObj
    this._isEqualUser = false
  }

  setActiveObjNotificationById({ _id }: IActiveParams) {
    const findElement = this._notifications.find(value => value._id === _id)
    const newActiveObj = {
      ...this._activeNotificationObj,
      ...findElement,
    }
    this._activeNotificationObj = newActiveObj
    this._currentNotificationObj = newActiveObj
    this._isEqualNotification = false
  }

  setActiveObjRequestById({ _id }: IActiveParams) {
    const findElement = this._requests.find(value => value._id === _id)
    const newActiveObj = {
      ...this._activeRequestObj,
      ...findElement,
    }
    this._activeRequestObj = newActiveObj
    this._currentRequestObj = newActiveObj
    this._isEqualRequest = false
  }

  setActiveObjMessageById({ _id }: IActiveParams) {
    const findElement = this._messages.find(value => value._id === _id)
    const newActiveObj = {
      ...this._activeMessageObj,
      ...findElement,
    }
    this._activeMessageObj = newActiveObj
    this._currentMessageObj = newActiveObj
    this._isEqualMessage = false
  }

  setActiveObj(data: IActiveObj) {
    this._activeObj = data
    this._isEqual = false
  }

  setCurrentObj(data: ICurrentObj) {
    this._currentObj = data
    this.setEqualObj()
  }

  setActiveCategoryObj(data: IActiveCategoryObj) {
    this._activeCategoryObj = data
    this._isEqualCategory = false
  }

  setCurrentCategoryObj(data: ICurrentCategoryObj) {
    this._currentCategoryObj = data
    this.setEqualCategory()
  }

  setActiveUserObj(data: IUserObj) {
    this._activeUserObj = data
    this._isEqualUser = false
  }

  setCurrentUserObj(data: IUserObj) {
    this._currentUserObj = data
    this.setEqualUser()
  }

  setActiveNotificationObj(data: INotificationObj) {
    this._activeNotificationObj = data
    this._isEqualNotification = false
  }

  setCurrentNotificationObj(data: INotificationObj) {
    this._currentNotificationObj = data
    this.setEqualNotification()
  }

  setActiveRequestObj(data: IREQUESTS) {
    this._activeRequestObj = data
    this._isEqualRequest = false
  }

  setCurrentRequestObj(data: IREQUESTS) {
    this._currentRequestObj = data
    this.setEqualRequest()
  }

  setActiveMessageObj(data: IMESSAGES) {
    this._activeMessageObj = data
    this._isEqualMessage = false
  }

  setCurrentMessageObj(data: IMESSAGES) {
    this._currentMessageObj = data
    this.setEqualMessage()
  }

  setCategory(data: ISOUNDCategories[], value: string) {
    const findElement = data.find(
      item => item.title.RUS === value,
    ) as ICurrentCategoryObj
    if (!findElement) return
    this._currentCategoryObj = {
      ...this._currentCategoryObj,
      category: findElement.category,
    }
    this.setEqualObj()
  }

  setCategoryForSound(data: ISOUNDCategories[], value: string) {
    const findElement = data.find(
      item => item.title.RUS === value,
    ) as ICurrentCategoryObj
    if (!findElement) return
    this._currentObj = {
      ...this._currentObj,
      category: findElement.title,
    }
    this.setEqualObj()
  }

  setLanguageOfUser(value: string) {
    const findElement = appData.languageArr.find(item => item.name === value)
    this._currentUserObj = {
      ...this._currentUserObj,
      appData: {
        ...this._currentUserObj.appData,
        language: findElement?.value as string,
      },
    }
  }
  setThemeOfUser(value: string) {
    const findElement = appData.themeArr.find(item => item.name === value)
    this._currentUserObj = {
      ...this._currentUserObj,
      appData: {
        ...this._currentUserObj.appData,
        theme: findElement?.value as string,
      },
    }
  }
  setRequestStatus(value: string) {
    const findElement = appData.statusRequestArr.find(
      item => item.name === value,
    )
    this._currentRequestObj = {
      ...this._currentRequestObj,
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
  setDeleteIndex(data: boolean) {
    this._deleteIndex = data
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
  setActiveWindow(data: string) {
    this._activeWindow = data
  }
  addSound(data: ISOUNDS) {
    this._sounds = [...this._sounds, { ...data }]
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
    this.setActiveObj(data)
    this.setCurrentObj(data)
  }
  updateMusic(data: IMUSICS) {
    this._musics = this._musics.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
    this.setActiveObj(data)
    this.setCurrentObj(data)
  }
  updateSoundCategory(data: ISOUNDCategories) {
    this._soundCategories = this._soundCategories.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
    this.setActiveCategoryObj(data)
    this.setCurrentCategoryObj(data)
  }
  updateMusicCategory(data: IMUSICCategories) {
    this._musicCategories = this._musicCategories.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
    this.setActiveCategoryObj(data)
    this.setCurrentCategoryObj(data)
  }
  updateNotification(data: INOTIFICATIONS) {
    this._notifications = this._notifications.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
    // this.setActiveNotificationObj(data)
  }
  updateRequest(data: IREQUESTS) {
    this._requests = this._requests.map(value => {
      if (value.number === data.number) {
        value = data
      }
      return value
    })
    // this.setActiveRequestObj(data)
  }
  updateMessages(data: IMESSAGES) {
    this._messages = this._messages.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
    // this.setActiveMessageObj(data)
  }

  updateUser(data: IUSERS) {
    this._users = this._users.map(value => {
      if (value._id === data._id) {
        value = data
      }
      return value
    })
    // this.setActiveUserObj(data)
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
  deleteUser(id: string) {
    this._users = this._users.filter(value => value._id !== id)
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
  get ActiveCategoryObj() {
    return this._activeCategoryObj
  }
  get CurrentCategoryObj() {
    return this._currentCategoryObj
  }
  get ActiveUserObj() {
    return this._activeUserObj
  }
  get CurrentUserObj() {
    return this._currentUserObj
  }
  get ActiveNotificationObj() {
    return this._activeNotificationObj
  }
  get CurrentNotificationObj() {
    return this._currentNotificationObj
  }
  get ActiveRequestObj() {
    return this._activeRequestObj
  }
  get CurrentRequestObj() {
    return this._currentRequestObj
  }
  get ActiveMessageObj() {
    return this._activeMessageObj
  }
  get CurrentMessageObj() {
    return this._currentMessageObj
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
  get DeleteIndex() {
    return this._deleteIndex
  }
  get IsEqual() {
    return this._isEqual
  }
  get IsEqualCategory() {
    return this._isEqualCategory
  }
  get IsEqualUser() {
    return this._isEqualUser
  }
  get IsEqualNotification() {
    return this._isEqualNotification
  }
  get IsEqualRequest() {
    return this._isEqualRequest
  }
  get IsEqualMessage() {
    return this._isEqualMessage
  }
  get FilePath() {
    return this._filePath
  }
  get NewFile() {
    return this._newFile
  }
  get ActiveWindow() {
    return this._activeWindow
  }
}
