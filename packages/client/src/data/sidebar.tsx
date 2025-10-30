import {
  Information,
  Categories,
  Sounds,
  Music,
  Notification,
  Requests,
  File,
  Users,
  Server,
  Exit,
} from 'images'

export const MAIN_ROUTE = '/main'
export const CATEGORIES_ROUTE = '/categories'
export const SOUNDS_ROUTE = '/sounds'
export const MUSICS_ROUTE = '/musics'
export const NOTIFICATIONS_ROUTE = '/notifications'
export const FILES_ROUTE = '/files'
export const REQUESTS_ROUTE = '/requests'
export const MESSAGES_ROUTE = '/messages'
export const USERS_ROUTE = '/users'
export const LOGIN_ROUTE = '/auth'
export const START_ROUTE = '/'
export const PASSWORD_RECOVERY_ROUTE = '/passwordRecovery'
export const EXIT_ROUTE = ''

export const sidebarNavItems = [
  {
    display: 'Information',
    icon: <Information />,
    to: MAIN_ROUTE,
    section: 'main',
  },
  {
    display: 'Categories',
    icon: <Categories />,
    to: CATEGORIES_ROUTE,
    section: 'categories',
  },
  {
    display: 'Sounds',
    icon: <Sounds />,
    to: SOUNDS_ROUTE,
    section: 'sounds',
  },
  {
    display: 'Musics',
    icon: <Music />,
    to: MUSICS_ROUTE,
    section: 'musics',
  },
  {
    display: 'Files',
    icon: <File />,
    to: FILES_ROUTE,
    section: 'files',
  },
  {
    display: 'Users',
    icon: <Users />,
    to: USERS_ROUTE,
    section: 'users',
  },
  {
    display: 'Notifications',
    icon: <Notification />,
    to: NOTIFICATIONS_ROUTE,
    section: 'notifications',
  },
  {
    display: 'Requets',
    icon: <Requests />,
    to: REQUESTS_ROUTE,
    section: 'requests',
  },
  {
    display: 'Server messages',
    icon: <Server />,
    to: MESSAGES_ROUTE,
    section: 'messages',
  },
  {
    display: 'Exit',
    icon: <Exit />,
    to: EXIT_ROUTE,
    section: 'exit',
  },
]
