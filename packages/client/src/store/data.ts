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
    _id: '01',
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
    _id: '02',
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
    date: new Date(),
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
    _id: '0',
    description: '',
    date: new Date(),
    number: '',
    email: '',
    name: '',
    topic: '',
    unread: false,
    status: '',
    solution: '',
    userID: '',
    globalCategory: 'REQUESTS',
    history: [
      {
        date: new Date(),
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
    _id: '',
    globalCategory: 'USERS',
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
  },
]

export const emptyCurrentUserLP = {
  _id: '',
  globalCategory: 'USERS',
  login: '',
  password: '',
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
}

export const emptyNotificationObj = {
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
  date: new Date(),
  name: 'Новое уведомление',
  unread: true,
  push: false,
  anonymousUsers: false,
  premiumUsers: false,
  globalCategory: 'NOTIFICATIONS',
  _id: '',
}

export const emptyRoles = [
  {
    value: '',
    _id: '',
  },
]

export const emptyMessages = [
  {
    _id: '',
    body: '',
    date: new Date(),
    id: '0',
    title: '',
    unread: false,
    globalCategory: 'MESSAGES',
  },
]

export const emptyCurrentUser = {
  _id: '',
  globalCategory: 'USERS',
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
}

export const emptyCurrentObj = {
  _id: '',
  id: '',
  name: '',
  globalCategory: '',
  booked: false,
  sound: '',
  storage: '',
  img: '',
  imgStorage: '',
  location: '',
  payment: false,
  category: { ENG: '', RUS: '' },
  title: { ENG: '', RUS: '' },
  description: { ENG: '', RUS: '' },
}

export const emptyActiveObj = {
  _id: '',
  id: '',
  name: '',
  globalCategory: '',
  booked: false,
  sound: '',
  storage: '',
  img: '',
  imgStorage: '',
  location: '',
  payment: false,
  category: { ENG: '', RUS: '' },
  title: { ENG: '', RUS: '' },
  description: { ENG: '', RUS: '' },
}

export const emptyActiveCategoryObj = {
  _id: '',
  id: '',
  category: '',
  globalCategory: '',
  title: {
    RUS: '',
    ENG: '',
  },
  img: '',
  imgStorage: '',
  img_lt: '',
  imgStorage_lt: '',
}

export const emptyCurrentCategoryObj = {
  _id: '',
  id: '',
  category: '',
  globalCategory: '',
  title: {
    RUS: '',
    ENG: '',
  },
  img: '',
  imgStorage: '',
  img_lt: '',
  imgStorage_lt: '',
}

export const emptyCurrentRequest = {
  _id: '',
  description: '',
  date: new Date(),
  number: '',
  email: '',
  name: '',
  topic: '',
  unread: false,
  status: '',
  solution: '',
  userID: '',
  globalCategory: 'REQUESTS',
  history: [
    {
      date: new Date(),
      status: '',
      userID: '',
      username: '',
      solution: '',
    },
  ],
}

export const emptyCurrentMessage = {
  _id: '',
  body: '',
  date: new Date(),
  id: '0',
  title: '',
  unread: false,
  globalCategory: 'MESSAGES',
}

export const emptyNewFile = {
  data: '',
  info: {
    type: '',
  },
}

export const emptyFile = {
  data: '',
  info: {
    type: '',
  },
  imgStorage: { data: { data: '', info: { type: '' } } },
  imgStorage_lt: { data: { data: '', info: { type: '' } } },
  storage: { data: { data: '', info: { type: '' } } },
}
