import { ChangeEvent, useContext, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import cl from './Auth.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'
import { appData } from 'data/app'
import { MODAL } from 'data/modal'
import { Button, FloatingInput } from 'components'
import { LoadData } from 'api/dataAPI'
import { errorHandler } from 'utils/errorHandler'
import { login } from 'api/userAPI'
import { IData } from 'store/Data/interfaces'
import { IUser } from 'store/Users/interfaces'
import { AxiosError } from 'axios'
import { LOGIN_ROUTE, PASSWORD_RECOVERY_ROUTE } from 'data/sidebar'

export const Auth = observer(() => {
  const { user, modal, data } = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async (event: React.MouseEvent) => {
    event.preventDefault()
    if (!username || !password) {
      const description = !username
        ? appData.authLabel.emptyUsername()
        : appData.authLabel.emptyPassword()
      modal.setShowModal(MODAL.modalMessageTitle.error, description)
      return
    }
    try {
      user.setShowLoading(true)
      const response = await login(username, password)
      const db = await LoadData()
      data.setAllData(db as IData)
      user.setShowLoading(false)
      user.setUser(response as IUser)
      user.setIsAuth(true)
    } catch (err) {
      const error = errorHandler(err as AxiosError) as string
      data.setShowLoading(false)
      modal.setShowModal(MODAL.modalMessageTitle.error, error)
    }
  }

  const recovery = async () => {
    console.log('recovery password')
  }

  return (
    <div className={cl.auth}>
      <div className={cl.main}>
        <form className={cl.form}>
          <h2 className={cl.h2}>
            {isLogin
              ? appData.authLabel.login
              : appData.authLabel.recoveryPassword}
          </h2>
          <FloatingInput
            required
            label={
              isLogin ? appData.authLabel.userName : appData.authLabel.email
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
          {isLogin && (
            <FloatingInput
              required
              label={appData.authLabel.password}
              type="password"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
          )}
          <div className={cl.footer}>
            <div className={cl.recoveryContainer}>
              {isLogin
                ? appData.authLabel.forgotPassword
                : appData.authLabel.haveAccount}
              {isLogin ? (
                <NavLink to={PASSWORD_RECOVERY_ROUTE} className={cl.link}>
                  Восстановить пароль
                </NavLink>
              ) : (
                <NavLink to={LOGIN_ROUTE} className={cl.link}>
                  Войти
                </NavLink>
              )}
            </div>
            <Button
              onClick={(event: React.MouseEvent) =>
                isLogin ? signIn(event) : recovery()
              }>
              {isLogin ? appData.authLabel.login : appData.authLabel.send}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
})
