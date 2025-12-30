import Constants from 'expo-constants'
import axios, { InternalAxiosRequestConfig } from 'axios'
import Storage from 'expo-sqlite/kv-store'
import store from '@/store'
import { addError } from '@/store/actions/error'

const dev = Constants.expoGoConfig.packagerOpts.dev
const url = dev
  ? `http://192.168.1.72:${process.env.EXPO_PUBLIC_SERVER_PORT}/api`
  : `https://${process.env.EXPO_PUBLIC_SERVER_HOST}:${process.env.EXPO_PUBLIC_SERVER_PORT}/api`

const authhost = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authFileHost = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

const host = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config.headers.authorization = `Bearer ${Storage.getItemSync('token')}`
  return config
}

authhost.interceptors.request.use(authInterceptor)
authFileHost.interceptors.request.use(authInterceptor)

authhost.interceptors.response.use(
  res => res,
  error => {
    if (error.response) {
      if (error.response.status) {
        if (
          (error.response.status === 401 &&
            error.response.statusText === 'Unauthorized') ||
          (error.response.status === 403 &&
            error.response.statusText === 'Forbidden' &&
            error.response.data.message === 'The user is not logged in')
        ) {
          Storage.removeItemAsync('token')
          // store.dispatch(clearUser())
        }
      }
    }
    return Promise.reject(error)
  },
)

host.interceptors.response.use(
  res => res,
  error => {
    store.dispatch(
      addError({
        status: error.response.status,
        message: error.response.data.message.RUS,
      }),
    )
  },
)

// authFileHost.interceptors.response.use(
//   res => res,
//   error => {
//     console.log('res authFileHost error = ', error)
//     if (error.response) {
//       if (error.response.status) {
//         if (
//           (error.response.status === 401 &&
//             error.response.statusText === 'Unauthorized') ||
//           (error.response.status === 403 &&
//             error.response.statusText === 'Forbidden' &&
//             error.response.data.message === 'The user is not logged in')
//         ) {
//           localStorage.removeItem('token')
//           // store.dispatch(clearUser())
//         }
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export { host, authhost, authFileHost }
