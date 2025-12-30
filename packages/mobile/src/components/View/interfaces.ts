import { type PropsWithChildren } from 'react'

export interface IView extends PropsWithChildren {
  style?: Record<string, unknown>
  type?: string
}
