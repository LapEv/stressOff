import axios, { InternalAxiosRequestConfig } from 'axios'

const url = __BASE_URL__.includes('https')
  ? `${__BASE_URL__}/api/`
  : `http://${__BASE_URL__}:${__SERVER_PORT__}/api/`

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
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

authhost.interceptors.request.use(authInterceptor)
authFileHost.interceptors.request.use(authInterceptor)

authhost.interceptors.response.use(
  res => res,
  error => {
    console.log('res error = ', error)
    if (error.response) {
      if (error.response.status) {
        if (
          (error.response.status === 401 &&
            error.response.statusText === 'Unauthorized') ||
          (error.response.status === 403 &&
            error.response.statusText === 'Forbidden' &&
            error.response.data.message === 'The user is not logged in')
        ) {
          localStorage.removeItem('token')
          // store.dispatch(clearUser())
        }
      }
    }
    return Promise.reject(error)
  },
)

export { host, authhost, authFileHost }
