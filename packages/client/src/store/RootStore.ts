import { ModalStore } from 'store'
import { UserStore } from 'store'
import { DataStore } from 'store'

export const store = {
  user: new UserStore(),
  modal: new ModalStore(),
  data: new DataStore(),
}
