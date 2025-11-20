export interface ITextareaGroup {
  main: string
  optional?: string
  containerwidth: Record<string, unknown>
  style?: Record<string, unknown>
  changetext?: (value: string) => void
  value: string
  label?: string
  autoFocus?: boolean
  placeholder?: string
  tabIndex: number
  required: boolean
  maxLength: number
  multiline: string
  id: string
  disabled?: boolean
}
