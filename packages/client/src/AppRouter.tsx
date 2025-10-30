import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './main'
import { authRoutes, loginRoutes } from 'data/Routes/rotes'
import { LOGIN_ROUTE, MAIN_ROUTE } from 'data/sidebar'

interface Routes {
  path: string
  Component: React.JSX.Element
}

export const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }: Routes) => (
          <Route path={path} element={Component} key={path} />
        ))}
      {!user.isAuth &&
        loginRoutes.map(({ path, Component }: Routes) => (
          <Route path={path} element={Component} key={path} />
        ))}
      <Route
        path="*"
        element={
          <Navigate to={!user.isAuth ? LOGIN_ROUTE : MAIN_ROUTE} replace />
        }
      />
    </Routes>
  )
})
