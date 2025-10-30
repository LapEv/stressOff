import { type PropsWithChildren } from 'react'
import { IActiveObj } from 'store/Data/interfaces'

export type IModal = PropsWithChildren<{
  visible: boolean
  setVisible: (bool: boolean) => void
}>

export interface IModalMessage {
  title: string
  description: string
  type: string
  buttons: boolean
  response: (answer: string | boolean) => void
  input: boolean
  value: string
  responseText: (value: string) => void
}

export interface IModalMessageSlide {
  title: string
  description: string
}

export type IModalSlide = PropsWithChildren<{
  visible: boolean
  setVisibleSlide: (bool: boolean) => void
  to: string
  object: IActiveObj
}>
