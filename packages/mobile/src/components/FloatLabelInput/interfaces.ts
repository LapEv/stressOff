export interface IFloatLabelInput {
  label: string
  value: string
  isPassword: boolean
  hintTextColor?: string
  onChangeText: (text: string) => void
  containerStyles: Record<string, unknown>
  togglePassword?: boolean
}
