import { memo } from 'react'
import cl from './Error.module.css'

interface Error {
  code?: string
  message: string
}

const notFoundError: Error = {
  code: '404',
  message: 'Ошибка! Страница не найдена, но мы потом поищем...',
}

export const ErrorPage = memo(
  ({ error = notFoundError }: { error?: Error }) => {
    const errMessage = `${error.code ? error.code : ''}\n${error.message ? error.message : ''}`
    return (
      <div className={cl.errorContainer}>
        <h1 className={cl.errorh1}>{errMessage}</h1>
      </div>
    )
  },
)
