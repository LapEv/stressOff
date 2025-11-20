import {
  CATEGORIES_ROUTE,
  FILES_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  MESSAGES_ROUTE,
  MUSICS_ROUTE,
  NOTIFICATIONS_ROUTE,
  PASSWORD_RECOVERY_ROUTE,
  REQUESTS_ROUTE,
  SOUNDS_ROUTE,
  USERS_ROUTE,
} from 'data/sidebar'
import {
  Auth,
  Categories,
  Files,
  Info,
  Messages,
  Musics,
  Requests,
  Users,
} from 'pages'
import { Notifications } from 'pages/Notifications'
import { Sounds } from 'pages/Sounds/Sounds'

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: <Info />,
  },
  {
    path: CATEGORIES_ROUTE,
    Component: <Categories />,
  },
  {
    path: SOUNDS_ROUTE,
    Component: <Sounds />,
  },
  {
    path: MUSICS_ROUTE,
    Component: <Musics />,
  },
  {
    path: FILES_ROUTE,
    Component: <Files />,
  },
  {
    path: USERS_ROUTE,
    Component: <Users />,
  },
  {
    path: NOTIFICATIONS_ROUTE,
    Component: <Notifications />,
  },
  {
    path: REQUESTS_ROUTE,
    Component: <Requests />,
  },
  {
    path: MESSAGES_ROUTE,
    Component: <Messages />,
  },
]

export const loginRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Auth />,
  },
  {
    path: PASSWORD_RECOVERY_ROUTE,
    Component: <Auth />,
  },
]
