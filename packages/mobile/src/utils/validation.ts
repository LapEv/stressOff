import store from '@/store'
import { addError } from '@/store/actions/error'

export const checkValidation = (
  type: string,
  value: string,
  password?: string,
) => {
  if (type === 'login') {
    const check = loginValidation(value)
    if (check === true) return true
    store.dispatch(
      addError({
        status: 400,
        message: check,
      }),
    )
  }
  if (type === 'password') {
    const check = passwordValidation(value)
    if (check === true) return true
    store.dispatch(
      addError({
        status: 400,
        message: check,
      }),
    )
  }
  if (type === 'confirmPassword') {
    const check = confirmPasswordValidation(value, password as string)
    if (check === true) return true
    store.dispatch(
      addError({
        status: 400,
        message: check,
      }),
    )
  }
  if (type === 'email') {
    const check = emailValidation(value)
    if (check === true) return true
    store.dispatch(
      addError({
        status: 400,
        message: check,
      }),
    )
  }
  return false
}

export const loginValidation = (value: string) => {
  if (value.length === 0) {
    return 'Поле логина обязательно для заполнения'
  }
  if (value.length < 3) {
    return 'Длина логина должна состовлять не менее 3 символов'
  }
  if (!value.match('^[-.a-zA-Z0-9_-]+$')) {
    return 'У логина только латиниские буквы, цифры'
  }
  if (value.length > 20) {
    return 'Длина логина состовлять не более 20 символов'
  }
  return true
}

export const passwordValidation = (value: string) => {
  if (value.length === 0) {
    return 'Поле пароля обязательно для заполнения'
  }
  if (value.length < 6) {
    return 'Длина пароля должна состовлять не менее 8 символов'
  }
  if (!value.match('[A-Z0-9]')) {
    return 'Пароль должен сожержать только латинские'
  }
  if (value.length > 30) {
    return 'Длина пароля состовлять не более 30 символов'
  }
  return true
}

export const confirmPasswordValidation = (value: string, password: string) => {
  if (value.length === 0) {
    return 'Поле потверждения пароля обязательно для заполнения'
  }
  if (value !== password) {
    return 'Пароли не совпадают'
  }
  if (value.length < 6) {
    return 'Длина потверждения пароля должна состовлять не менее 8 символов'
  }
  if (!value.match('[A-Z0-9]')) {
    return 'Пароль потверждения должен сожержать только латинские'
  }
  if (value.length > 30) {
    return 'Длина пароля потверждения состовлять не более 30 символов'
  }
  return true
}

export const emailValidation = (value: string) => {
  if (value.length === 0) {
    return 'Поле email обязательно для заполнения'
  }
  if (!value.match('^[a-zA-z0-9]+[a-zA-Z\\d-_.]*@[a-z\\d-_]+\\.')) {
    return 'Неправильный email'
  }
  return true
}
