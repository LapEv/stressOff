import { AppNavigation } from 'navigations'
import { Provider } from 'react-redux'
import store from '@/store'
import React, { useEffect, useState } from 'react'
import { Loading, NoInternet } from 'screens'
import { bootstrap } from '@/functions/Bootstrap/bootstrap'
import { checkNetwork } from '@/functions'
import * as SecureStore from 'expo-secure-store'
import { IBootstrapResult } from '@/functions/interfaces'
import { changeConnect } from '@/store/actions/connect'

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isBootReady, setIsBootReady] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(true)
  const [token, setToken] = useState<string | null>(null)

  if (!isBootReady) {
    setTimeout(() => {
      setIsBootReady(true)
    }, 300)
  }

  const checkInternet = async () => {
    // await SecureStore.deleteItemAsync('token')
    const token = await SecureStore.getItemAsync('token')
    setToken(token)
    await checkNetwork({ setIsConnected })
    if (!isReady) {
      bootstrap({ isConnected, token }).then((result: IBootstrapResult) => {
        setIsReady(result.status)
      })
    }
  }

  useEffect(() => {
    checkInternet()
  }, [])

  useEffect(() => {
    console.log('Изменение в подключении. isConnected = ', isConnected)
    console.log('Поставить 3000 секунд')
    store.dispatch(changeConnect(isConnected))
  }, [isConnected])

  return (
    <Provider store={store}>
      {!isConnected && isBootReady && !token ? (
        <NoInternet />
      ) : !isReady || !isBootReady ? (
        <Loading />
      ) : (
        <AppNavigation
          login={isConnected && !token ? false : true}
          setToken={setToken}
        />
      )}
    </Provider>
  )
}
