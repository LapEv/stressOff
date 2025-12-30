import { type PropsWithChildren } from 'react'

export interface IText extends PropsWithChildren {
  style?: Record<string, unknown>
  type?: string
  numberOfLines?: number
  colorType?: string
  onPress?: () => void
}

export interface ITextConst extends PropsWithChildren {
  style?: Record<string, unknown>
  type?: string
}
