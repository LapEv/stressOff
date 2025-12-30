import { TouchableOpacity as DefaultTouchable } from 'react-native'
import { ITouchable } from './interfaces'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { ITheme } from 'theme/interfaces'

export const Touchable = (props: ITouchable) => {
  const { style, activeOpacity, background, ...otherProps } = props
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const backgroundColor =
    background !== undefined ? background : theme.BACKGROUNDCOLOR
  const borderColor = theme.borderColorRGBA
  return (
    <DefaultTouchable
      activeOpacity={activeOpacity}
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  )
}
