import { ChangeEvent, type PropsWithChildren } from 'react'

export type IFloatingInput = PropsWithChildren<{
  required: boolean
  label: string
  type?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}>
