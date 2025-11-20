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
  autoFocus?: boolean
  placeholder?: string
  type: string
  id: string
  disabled?: boolean
}
