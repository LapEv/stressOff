import type { ColorValue, ImageSourcePropType } from 'react-native'

export interface IConstantsTheme {
  light: ITheme
  dark: ITheme
  theme: {
    _key: string
  }
  currentTheme: string
  MAIN_BACKGROUNDSTYLES: {
    height: string
    justifyContent: string
    alignItems: string
  }
  title_20b: IText
  title_16b: IText
  title_14: IText
  title_30b: IText
  text_16: IText
  text_14b: IText
  text_12: IText
  text_14: IText
  text_30: IText
  SHADOW_FOR_IOS: IShadowForIOS
}

export interface ITheme {
  _key: 'Theme'
  BACKGROUNDCOLOR_LG: readonly [ColorValue, ColorValue, ...ColorValue[]]
  BACKGROUNDCOLOR_LG_Disabled: readonly [
    ColorValue,
    ColorValue,
    ...ColorValue[],
  ]
  BACKGROUNDCOLOR: string
  BACKGROUNDCOLOR_HEADER: string
  BACKGROUNDCOLOR_TILES: string
  NO_ACTIVE: string
  TEXT_COLOR: string
  ITEM_COLOR: string
  CHECK_COLOR: string
  DANGER_COLOR: string
  nameTheme: string
  bookedColor: string
  borderColor: string
  borderColor2: string
  borderColorRGBA2: string
  borderColorRGBA: string
  toFavoritesScreen: ImageSourcePropType | undefined
}

export interface IText {
  fontSize: number
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontFamily: string
}

export interface IShadowForIOS {
  shadowColor?: string
  shadowOffset?: { width: number; height: number }
  shadowOpacity?: number
  elevation?: number
}
