export interface ICheckBox {
  containerwidth: Record<string, unknown>
  tabIndex: number
  value: boolean
  name: string
  label: string
  onChangeChecked: (value: boolean) => void
}
