export const emptySound = [
  {
    _id: '',
    id: '0',
    name: '',
    globalCategory: 'DATA_SOUNDS',
    booked: false,
    sound: '',
    storage: '',
    img: '',
    imgStorage: '',
    location: 'cloud',
    payment: false,
    category: {
      ENG: '',
      RUS: '',
    },
    description: {
      ENG: '',
      RUS: '',
    },
    title: {
      ENG: '',
      RUS: 'Добавить звук',
    },
  },
]

export const emptyMusic = [
  {
    booked: false,
    category: {
      ENG: '',
      RUS: '',
    },
    description: {
      ENG: '',
      RUS: '',
    },
    globalCategory: 'DATA_MUSICS',
    id: '0',
    img: '',
    imgStorage: '',
    location: 'cloud',
    name: '',
    payment: false,
    sound: '',
    storage: '',
    title: {
      ENG: '',
      RUS: 'Добавить музыку',
    },
    _id: '',
  },
]

export const emptyCategorySound = [
  {
    category: '',
    globalCategory: 'SOUNDS_Categories',
    id: '0',
    img: '',
    imgStorage: '',
    imgStorage_lt: '',
    img_lt: '',
    title: {
      RUS: 'Добавить категорию',
      ENG: '',
    },
    _id: '',
  },
]

export const emptyCategoryMusic = [
  {
    category: '',
    globalCategory: 'MUSICS_Categories',
    id: '0',
    img: '',
    imgStorage: '',
    imgStorage_lt: '',
    img_lt: '',
    title: {
      RUS: 'Добавить категорию',
      ENG: '',
    },
    _id: '',
  },
]

export const emptyNotification = [
  {
    id: '0',
    img: '',
    title: {
      RUS: 'Новое уведомление',
      ENG: '',
    },
    body: {
      RUS: '',
      ENG: '',
    },
    date: '',
    name: 'Новое уведомление',
    unread: true,
    push: false,
    anonymousUsers: false,
    premiumUsers: false,
    globalCategory: 'NOTIFICATIONS',
    _id: '',
  },
]

export const emptyRequests = [
  {
    _id: '',
    description: '',
    date: '',
    number: '',
    email: '',
    name: '',
    topic: '',
    unread: false,
    status: '',
    solution: '',
    userID: '',
    globalCategory: '',
    history: [
      {
        date: '',
        status: '',
        userID: '',
        username: '',
        solution: '',
      },
    ],
  },
]

export const emptyUsers = [
  {
    appData: {
      language: 'RUS',
      theme: 'MAIN_THEME',
    },
    personalData: {
      createdAt: '',
      email: '',
      name: '',
      password: '',
      roles: ['USER'],
      token: '',
      type: 'isAnonymous',
      username: 'Новый пользователь',
    },
    globalCategory: 'USERS',
    _id: '',
  },
]

export const emptyMessages = [
  {
    _id: '',
    body: '',
    date: '',
    id: '',
    title: '',
    unread: false,
    globalCategory: '',
  },
]

export const emptyUsersObj = [
  {
    _id: '',
  },
]

export const emptyCurrentObj = {
  _id: '',
  id: '',
  category: '',
  appData: {
    language: '',
    theme: '',
    notificationsByEmail: {
      news: false,
      newSounds: false,
      requestStatuses: false,
    },
  },
  status: '',
  storage: '',
  title: {
    ENG: '',
    RUS: '',
  },
  globalCategory: '',
  location: '',
  payment: false,
  name: '',
  imgStorage: '',
  imgStorage_lt: '',
}

export const emptyActiveObj = {
  _id: '',
  id: '',
  category: '',
  appData: {
    language: '',
    theme: '',
    notificationsByEmail: {
      news: false,
      newSounds: false,
      requestStatuses: false,
    },
  },
  status: '',
  storage: '',
  title: {
    ENG: '',
    RUS: '',
  },
  globalCategory: '',
  location: '',
  payment: false,
  name: '',
  imgStorage: '',
  imgStorage_lt: '',
}

export const emptyNewFile = {
  data: '',
  info: {
    type: '',
  },
}

export const emptyFile = {
  lastModified: 0,
  name: '',
  webkitRelativePath: '',
  size: 0,
  type: '',
  // arrayBuffer: ,
  bytes: '',
  slice: '',
  stream: '',
  text: '',
}
