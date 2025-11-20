import { PropsWithChildren } from 'react'

export type IIcons = PropsWithChildren<{
  style?: Record<string, unknown>
  className?: string
  onClick?: (event: React.MouseEvent) => void
}>
