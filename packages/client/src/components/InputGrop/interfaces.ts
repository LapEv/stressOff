import { DataStore } from 'store'

export interface InputProps {
  main: string
  tabIndex?: number
  required?: boolean
  optional?: string
  containerwidth: Record<string, unknown>
  style?: Record<string, unknown>
  changetext?: (value: string) => void
  value: string
  label?: string
  data: DataStore
  autoFocus?: boolean
  placeholder?: string
}
