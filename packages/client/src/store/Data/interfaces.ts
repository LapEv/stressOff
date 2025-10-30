export interface IDataStore {
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
  _file: {}
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
}

export interface IData {
  soundDB: ISOUNDS[]
  musicDB: IMUSICS[]
  soundCategoriesDB: ISOUNDCategories[]
  musicCategoriesDB: IMUSICCategories[]
  notificationDB: INOTIFICATIONS[]
  requestDB: IREQUESTS[]
  messagesDB: IMESSAGES[]
  usersDB: IUSERS[]
  listFiles: string[]
  sizeImages: number
  sizeSounds: number
  rolesDB: string[]
}

export interface ISOUNDS {
  _id: string
  id: string
  name: string
  globalCategory: string
  booked: boolean
  sound: string
  storage: string
  img: string
  imgStorage: string
  location: string
  payment: boolean
  category: {
    RUS: string
    ENG: string
  }
  title: {
    RUS: string
    ENG: string
  }
  description: {
    RUS: string
    ENG: string
  }
}

export interface IMUSICS {
  _id: string
  id: string
  name: string
  globalCategory: string
  booked: boolean
  sound: string
  storage: string
  img: string
  imgStorage: string
  location: string
  payment: boolean
  category: {
    RUS: string
    ENG: string
  }
  title: {
    RUS: string
    ENG: string
  }
  description: {
    RUS: string
    ENG: string
  }
}

export interface ISOUNDCategories {
  _id: string
  id: string
  globalCategory: string
  title: {
    RUS: string
    ENG: string
  }
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: string
}

export interface IMUSICCategories {
  _id: string
  id: string
  globalCategory: string
  title: {
    RUS: string
    ENG: string
  }
  img: string
  imgStorage: string
  img_lt: string
  imgStorage_lt: string
  category: string
}

export interface IREQUESTS {
  _id: string
  description: string
  date: string
  number: string
  email: string
  name: string
  topic: string
  unread: boolean
  status: string
  solution: string
  userID: string
  globalCategory: string
  history: IHistoryRequests[]
}

export interface IHistoryRequests {
  date: string
  status: string
  userID: string
  username: string
  solution: string
}

export interface INOTIFICATIONS {
  _id: string
  anonymousUsers: boolean
  body: {
    RUS: string
    ENG: string
  }
  date: string
  id: string
  img: string
  name: string
  push: boolean
  title: {
    RUS: string
    ENG: string
  }
  unread: boolean
  premiumUsers: boolean
  globalCategory: string
}

export interface IMESSAGES {
  _id: string
  body: string
  date: string
  id: string
  title: string
  unread: boolean
  globalCategory: string
}

export interface IUSERS {
  _id: string
  globalCategory: string
  appData: {
    language: string
    theme: string
  }
  personalData: {
    createdAt: string
    email: string
    name: string
    password: string
    roles: string[]
    token: string
    type: string
    username: string
  }
}

export interface IActiveObj {
  _id: string
  id: string
  title: ITitle
  appData: IAppData
  category: string
  status: string
  storage: string
  globalCategory: string
  location: string
  payment: boolean
  push?: boolean
  name: string
  imgStorage: string
  imgStorage_lt: string
}

export interface ICurrentObj {
  _id: string
  id: string
  title: ITitle
  appData: IAppData
  category: string
  status: string
  storage: string
  globalCategory: string
  location: string
  payment: boolean
  name: string
  imgStorage: string
  imgStorage_lt: string
}

export interface ITitle {
  RUS: string
  ENG: string
}

export interface IAppData {
  language: string
  theme: string
  notificationsByEmail: INotificationsByEmail
}

export interface ILanguage {
  name: string
  value: string
  id: number
}

export interface ITheme {
  name: string
  value: string
  id: number
}

export interface INotificationsByEmail {
  news: boolean
  newSounds: boolean
  requestStatuses: boolean
}

export interface INewFile {
  data: string
  info: {
    type: string
  }
}
