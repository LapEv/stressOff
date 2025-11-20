import {
  IMUSICCategories,
  IMUSICS,
  ISOUNDCategories,
  ISOUNDS,
  IUserObj,
} from 'store/Data/interfaces'

export interface IUsersModule {
  roles: {
    value: string
    _id: string
    name?: string
  }[]
}

export interface IDropDownDataUser {
  type: string
  id: string
  styleinputGroup?: Record<string, unknown>
  style?: Record<string, unknown>
  containerwidth: Record<string, unknown>
  main: string
  optional?: string
  list: {
    name?: string | undefined
    value: string | boolean
    id?: number
    _id?: string
  }[]
  getFileImg?: (value: string) => void
  getFileSound?: (value: string) => void
  required?: boolean
  tabIndex?: number
  placeholder?: string
  label?: string
  defaultValue?: string
  changeValue?: (value: string) => void
}

export interface IUserData {
  quantitySounds: number
  quantityMusics: number
  setQuantitySounds: (data: number | ((data: number) => void)) => void
  setQuantityMusics: (data: number | ((data: number) => void)) => void
}

export interface ICategoriesDataUsers {
  data: ISOUNDCategories[] | IMUSICCategories[]
  type: string
  changeValue: (
    text: string | boolean,
    type: string,
    key: string,
    id: string,
  ) => void
}

export interface ISoundsDataUsers {
  data: ISOUNDS[] | IMUSICS[]
  type: string
  quantity: number
  changeValue: (
    text: string | boolean,
    type: string,
    key: string,
    id: string,
  ) => void
  changeQuantity: (data: boolean) => void
  showAll: () => void
}
