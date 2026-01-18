import { IError } from '@/store/interfaces'

export interface errorActions {
  addError: (data: IError) => void
  clearError: () => void
}
