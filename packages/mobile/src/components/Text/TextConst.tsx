import { Text as DefaultText } from 'react-native'
import { ITextConst } from './interfaces'
import { dataApp } from '@/data/dataApp'

export const TextConst = (props: ITextConst) => {
  const { style, ...otherProps } = props
  const fontSize = dataApp.THEME.TITLE_FONT_SIZE
  const color = dataApp.THEME.TEXT_COLOR
  return <DefaultText style={[{ fontSize, color }, style]} {...otherProps} />
}
