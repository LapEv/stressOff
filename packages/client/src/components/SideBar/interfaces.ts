export interface IMenu {
  sidebarNavItems: ISideBarItems[]
  modal: any
  activeIndex: number
  unreadRequests: number
  unreadMessages: number
}

export interface ISideBarItems {
  display: string
  icon: React.JSX.Element
  to: string
  section: any
}
