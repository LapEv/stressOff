import { Shadow as DefaultShadow } from 'react-native-shadow-2'
import { IShadow } from './interfaces'
export const Shadow = (props: IShadow) => {
  const { style, width, containerStyle, ...otherProps } = props

  const shadowOpt = {
    width: width,
    height: 62,
    borderRadius: 15,
    opacity: 0.7,
    x: 0,
    y: 0,
  }
  return (
    <DefaultShadow
      style={{ ...shadowOpt, ...style }}
      containerStyle={containerStyle}
      {...otherProps}
    />
  )
}
