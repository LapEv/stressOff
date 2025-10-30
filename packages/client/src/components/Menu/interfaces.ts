import { CSSProperties } from 'react'
import { DataStore } from 'store'

export interface IMenu {
  items: {
    category: string
    item: string
    _id: string
  }[]
}

export interface IActiveParams {
  _id: string
  position: number
}

export interface IMenuSection {
  section: string
  items: {
    category: string
    item: string
    _id: string
  }[]
  setActiveItem: (data: IActiveParams) => void
  activeItem: IActiveParams
  changeState: (prev: boolean) => void
  state: boolean
  style?: CSSProperties | undefined
  data: DataStore
}

export interface IMenuItems {
  value: {
    category: string
    item: string
    _id: string
  }
  index: number
  activeContainer: boolean
  setActiveContainer: () => void
  setActiveItem: (data: IActiveParams) => void
  activeItem: IActiveParams
  state: boolean
  data: DataStore
}
