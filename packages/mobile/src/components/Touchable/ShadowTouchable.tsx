import { Shadow as DefaultShadow } from 'react-native-shadow-2'
import { TouchableOpacity as DefaultTouchable } from 'react-native'
import { useSelector } from 'react-redux'
import { ITheme } from '@/theme/interfaces'
import { RootState } from '@/store'
import { IShadowTouchable } from './interfaces'

export const ShadowTouchable = (props: IShadowTouchable) => {
  const {
    styleshadow,
    containerStyle,
    style,
    activeOpacity,
    background,
    border,
    ...otherProps
  } = props
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const backgroundColor =
    background !== undefined ? background : theme.BACKGROUNDCOLOR
  const borderColor = border !== undefined ? border : theme.borderColorRGBA

  const shadowOpt = {
    borderRadius: 10,
    opacity: 0.7,
    x: 0,
    y: 0,
  }

  return (
    <DefaultShadow
      style={{ ...shadowOpt, ...styleshadow }}
      containerStyle={containerStyle}
      {...otherProps}>
      <DefaultTouchable
        activeOpacity={activeOpacity}
        style={[style, { backgroundColor, borderColor }]}
        {...otherProps}
      />
    </DefaultShadow>
  )
}
