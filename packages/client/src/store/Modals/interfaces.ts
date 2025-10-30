import { IActiveObj } from 'store/Data/interfaces'

export interface IModalStore {
  _isVisible: boolean
  _isSlideVisible: boolean
  _title: string
  _description: string
  _buttons: boolean
  _request: string
  _type: string
  _response: string
  _input: boolean
  _inputText: string
  _modalHistory: boolean
  _to: string
  _object: IActiveObj
}

export interface IModalParams {
  title: string
  description: string
  to: string
  object: IActiveObj
}

export interface IModalQuestionParams {
  title: string
  description: string
  type: string
  request: string
}
