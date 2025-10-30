import { makeAutoObservable } from 'mobx'
import { IModalStore, IModalParams, IModalQuestionParams } from './interfaces'
import { emptyActiveObj } from 'store/data'
import { IActiveObj } from 'store/Data/interfaces'

export class ModalStore implements IModalStore {
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

  constructor() {
    this._isVisible = false
    this._isSlideVisible = false
    this._title = ''
    this._description = ''
    this._buttons = false
    this._request = ''
    this._type = ''
    this._response = ''
    this._input = false
    this._inputText = ''
    this._modalHistory = false
    this._to = ''
    this._object = emptyActiveObj
    makeAutoObservable(this)
  }

  setIsVisible(bool: boolean) {
    this._isVisible = bool
    if (!bool) {
      this._request = ''
      this._response = ''
      this._input = false
      this._inputText = ''
    }
  }

  setIsSlideVisible(bool: boolean) {
    this._isSlideVisible = bool
  }

  setShowModalSlide({ title, description, to, object }: IModalParams) {
    this._isSlideVisible = true
    this._title = title
    this._to = to
    this._description = description
    this._object = object
  }

  setTitle(title: string) {
    this._title = title
  }

  setDescription(description: string) {
    this._description = description
  }

  setInputText(value: string) {
    this._inputText = value
  }

  setShowModal(title: string, description: string) {
    this._title = title
    this._description = description
    this._isVisible = true
    this._buttons = false
    this._input = false
  }

  setShowQuestionModal({
    title,
    description,
    type,
    request,
  }: IModalQuestionParams) {
    this._title = title
    this._description = description
    this._type = type
    this._request = request
    this._isVisible = true
    this._buttons = true
  }
  setShowQuestionInputModal({
    title,
    description,
    type,
    request,
  }: IModalQuestionParams) {
    this._title = title
    this._description = description
    this._type = type
    this._request = request
    this._isVisible = true
    this._buttons = true
    this._input = true
    this._inputText = ''
  }

  setResponse(response: string) {
    this._response = response
  }

  setModalHistory(bool: boolean) {
    this._modalHistory = bool
  }

  get isVisible() {
    return this._isVisible
  }
  get isSlideVisible() {
    return this._isSlideVisible
  }
  get title() {
    return this._title
  }
  get description() {
    return this._description
  }
  get type() {
    return this._type
  }
  get buttons() {
    return this._buttons
  }
  get request() {
    return this._request
  }
  get response() {
    return this._response
  }
  get input() {
    return this._input
  }
  get inputText() {
    return this._inputText
  }
  get modalHistory() {
    return this._modalHistory
  }
  get to() {
    return this._to
  }
  get object() {
    return this._object
  }
}
