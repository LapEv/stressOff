import { Text as DefaultText } from 'react-native'
import { IText } from './interfaces'
import { RootState } from 'store'
import { ITheme } from 'theme/interfaces'
import { useSelector } from 'react-redux'
import theme from '@/theme/Theme'

export const Text = (props: IText) => {
  const { style, type, colorType, onPress, ...otherProps } = props
  const themeCurrent = useSelector<RootState>(state => state.theme) as ITheme
  const styleTextkey = Object.keys(theme).find(key => key === type) as string
  const styleText = theme[styleTextkey as keyof typeof theme] as
    | Record<string, unknown>
    | undefined

  const textColor =
    colorType === 'error' ? themeCurrent.DANGER_COLOR : themeCurrent.TEXT_COLOR
  return (
    <DefaultText
      style={[styleText, { color: textColor }, style]}
      onPress={onPress}
      {...otherProps}
    />
  )
}
