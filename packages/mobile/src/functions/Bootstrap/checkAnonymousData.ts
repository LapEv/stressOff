import { check, setAnonymousUser } from '@/api/userAPI'
import { getPesonalData } from '@/db'
import { createDataFromCloud } from './createDataFromCloud'
import { bootstrap } from './bootstrap'

export const checkAnonymousData = async () => {
  const personalData = await getPesonalData()
  if (!personalData) {
    const { user, token } = await setAnonymousUser()
    await createDataFromCloud(user)
    await bootstrap({ isConnected: true, token, user: user.personalData })
    return true
  }
  const { user, token } = await check()
  await bootstrap({ isConnected: true, token, user: user })
  return true
}
