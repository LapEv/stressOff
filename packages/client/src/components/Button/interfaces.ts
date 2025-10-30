import { type PropsWithChildren } from 'react'

export type IButton = PropsWithChildren<{
  opacity?: number
  visible?: boolean
  style?: Record<string, unknown>
  tabIndex?: number
  onClick?: (event: React.MouseEvent) => void
  disabled?: boolean
}>
