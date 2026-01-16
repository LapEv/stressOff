import { check, setAnonymousUser } from '@/api/userAPI'
import { getPesonalData } from '@/db'
import { createDataFromCloud } from './createDataFromCloud'
import { bootstrap } from './bootstrap'
import * as SecureStore from 'expo-secure-store'
import { IUser } from '@/store/interfaces'

export const checkAnonymousData = async () => {
  const personalData = await getPesonalData()
  if (!personalData) {
    const { user, token } = await setAnonymousUser()
    await createDataFromCloud(user)
    await bootstrap({ isConnected: true, token, user: user.personalData })
    return true
  }
  const tokenCheck = await SecureStore.getItemAsync('token')

  if (!tokenCheck) {
    await bootstrap({
      isConnected: true,
      token: tokenCheck,
      user: personalData[0] as IUser,
    })
    return true
  }
  const { user, token } = await check()
  await bootstrap({ isConnected: true, token, user: user })
  return true
}
