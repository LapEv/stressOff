export interface IDropDownGroup {
  data: {
    name?: string
    id?: number
  }[]
  required?: boolean
  tabIndex?: number
  placeholder?: string
  label?: string
  style?: Record<string, unknown>
  styleinputGroup?: Record<string, unknown> | undefined
  getFirstValueOnBlur?: (value: string) => void
  containerwidth: Record<string, unknown>
  value: string
  onChange: (value: string) => void
  inputProps?: {
    required?: boolean
    tabIndex?: number
    placeholder?: string
    label?: string
  }
  list?: {
    name: string
    value: string
    id: number
  }[]
  type?: string
  keyPress?: (value: string) => void
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}
