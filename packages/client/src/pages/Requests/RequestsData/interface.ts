import { IHistoryRequests } from 'store/Data/interfaces'

export interface IRequestHistory {
  visible: boolean
  history: IHistoryRequests[]
  setModalHistory: () => void
}

export interface IRequestDropDownData {
  required?: boolean
  tabIndex?: number
  placeholder?: string
  label?: string
  style?: Record<string, unknown>
  styleinputGroup?: Record<string, unknown> | undefined
  getFirstValueOnBlur?: (value: string) => void
  containerwidth: Record<string, unknown>
  inputProps?: {
    required?: boolean
    tabIndex?: number
    placeholder?: string
    label?: string
  }
  list: {
    name: string
    value: string
    id: number
  }[]
  main: string
  defaultValue: string
}
