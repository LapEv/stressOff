import { View as DefaultView } from 'react-native'
import { IView } from './interfaces'
import { useTheme } from '@/hooks'

export const ViewStyle = (props: IView) => {
  const { style, type, ...otherProps } = props
  const [theme] = useTheme()
  const backgroundColor =
    type === 'header'
      ? theme.BACKGROUNDCOLOR_HEADER
      : type === 'check'
        ? theme.CHECK_COLOR
        : type === 'tiles'
          ? theme.BACKGROUNDCOLOR_TILES
          : theme.BACKGROUNDCOLOR
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
