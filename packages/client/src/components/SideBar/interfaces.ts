import { ModalStore } from 'store'

export interface IMenu {
  sidebarNavItems: ISideBarItems[]
  modal: ModalStore
  activeIndex: number
  unreadRequests: number
  unreadMessages: number
}

export interface ISideBarItems {
  display: string
  icon: React.JSX.Element
  to: string
  section: string
}
