import { Component, PropsWithChildren } from 'react'
import { Error } from 'pages'

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      const notFoundError = {
        message: 'Упс. Мы работаем над исправлением ошибки.',
      }

      return <Error error={notFoundError} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
