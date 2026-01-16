import { Shadow as DefaultShadow } from 'react-native-shadow-2'
import { TouchableOpacity as DefaultTouchable } from 'react-native'
import { IShadowTouchable } from './interfaces'
import { useTheme } from '@/hooks'

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
  const [{ BACKGROUNDCOLOR, borderColorRGBA }] = useTheme()
  const backgroundColor =
    background !== undefined ? background : BACKGROUNDCOLOR
  const borderColor = border !== undefined ? border : borderColorRGBA

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
