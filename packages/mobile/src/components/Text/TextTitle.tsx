import { Text as DefaultText } from 'react-native'
import { IText } from './interfaces'
import theme from '@/theme/Theme'
import { useTheme } from '@/hooks'

export const TextTitle = (props: IText) => {
  const { style, type, colorType, ...otherProps } = props
  const [{ DANGER_COLOR, TEXT_COLOR, CHECK_COLOR }] = useTheme()
  const styleTextkey = Object.keys(theme).find(key => key === type) as string
  const styleText = theme[styleTextkey as keyof typeof theme] as
    | Record<string, unknown>
    | undefined
  const textColor =
    colorType === 'error'
      ? DANGER_COLOR
      : colorType === 'check'
        ? CHECK_COLOR
        : TEXT_COLOR
  return (
    <DefaultText
      style={[styleText, { color: textColor }, style]}
      {...otherProps}
    />
  )
}
