import {
  CATEGORIES_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PASSWORD_RECOVERY_ROUTE,
} from 'data/sidebar'
import { Auth, Categories, Info } from 'pages'

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: <Info />,
  },
  {
    path: CATEGORIES_ROUTE,
    Component: <Categories />,
  },
  // {
  //   path: SOUNDS_ROUTE,
  //   Component: <Sounds />,
  // },
  // {
  //   path: MUSICS_ROUTE,
  //   Component: <Musics />,
  // },
  // {
  //   path: FILES_ROUTE,
  //   Component: <Files />,
  // },
  // {
  //   path: USERS_ROUTE,
  //   Component: <Users />,
  // },
  // {
  //   path: NOTIFICATIONS_ROUTE,
  //   Component: <Notifications />,
  // },
  // {
  //   path: REQUESTS_ROUTE,
  //   Component: <Requests />,
  // },
  // {
  //   path: MESSAGES_ROUTE,
  //   Component: <Messages />,
  // },
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
