import { View as DefaultView } from 'react-native'
import { IView } from './interfaces'
import { RootState } from 'store'
import { ITheme } from 'theme/interfaces'
import { useSelector } from 'react-redux'

export const ViewStyle = (props: IView) => {
  const { style, type, ...otherProps } = props
  const theme = useSelector<RootState>(state => state.theme) as ITheme
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
