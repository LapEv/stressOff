import { TouchableOpacity as DefaultTouchable } from 'react-native'
import { ITouchable } from './interfaces'
import { useTheme } from '@/hooks'

export const Touchable = (props: ITouchable) => {
  const { style, activeOpacity, background, ...otherProps } = props
  const [{ BACKGROUNDCOLOR, borderColorRGBA }] = useTheme()
  const backgroundColor =
    background !== undefined ? background : BACKGROUNDCOLOR
  const borderColor = borderColorRGBA
  return (
    <DefaultTouchable
      activeOpacity={activeOpacity}
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  )
}
