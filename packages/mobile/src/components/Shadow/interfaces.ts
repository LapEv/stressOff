import { type PropsWithChildren } from 'react'

export interface IShadow extends PropsWithChildren {
  style?: Record<string, unknown>
  width?: number
  containerStyle?: Record<string, unknown>
  type?: string
}
