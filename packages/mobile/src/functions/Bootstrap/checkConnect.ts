import * as Network from 'expo-network'
import { ICheckNetwork } from './interfaces'

export const checkNetwork = async ({ setIsConnected }: ICheckNetwork) => {
  const networkState = await Network.getNetworkStateAsync()
  const checkInternet =
    (networkState.isConnected && networkState.isInternetReachable) ?? false
  setIsConnected(checkInternet)
  const listener = Network.addNetworkStateListener(
    ({ isConnected, isInternetReachable }) => {
      const checkInternet = (isConnected && isInternetReachable) ?? false
      setIsConnected(checkInternet)
    },
  )
  return () => {
    listener.remove
  }
}
