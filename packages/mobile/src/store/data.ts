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
    location: '',
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
      RUS: '',
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
    location: '',
    name: '',
    payment: false,
    sound: '',
    storage: '',
    title: {
      ENG: '',
      RUS: '',
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
      RUS: '',
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
      RUS: '',
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
      RUS: '',
      ENG: '',
    },
    body: {
      RUS: '',
      ENG: '',
    },
    date: new Date(),
    name: '',
    unread: true,
    push: false,
    anonymousUsers: false,
    premiumUsers: false,
    globalCategory: 'NOTIFICATIONS',
    _id: '',
  },
]
