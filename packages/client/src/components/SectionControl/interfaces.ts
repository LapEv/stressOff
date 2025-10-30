export interface ISection {
  nameSection?: string
  toogleContainer: () => void
  style?: Record<string, unknown>
  active: boolean
}
