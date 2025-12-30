import { type PropsWithChildren } from 'react'
import { AccessibilityRole } from 'react-native'

export interface ITouchable extends PropsWithChildren {
  style?: Record<string, unknown>
  type?: string
  onPress?: () => void
  onLongPress?: () => void
  onPressIn?: () => void
  accessibilityRole?: AccessibilityRole
  accessibilityState?: {
    selected: boolean
  }
  accessibilityLabel?: string
  testID?: string
  disabled?: boolean
  activeOpacity?: number
  background?: string | null | undefined
}

export interface IShadowTouchable extends PropsWithChildren {
  style?: Record<string, unknown>
  type?: string
  styleshadow?: Record<string, unknown>
  width?: number
  containerStyle?: Record<string, unknown>

  onPress?: () => void
  onLongPress?: () => void
  onPressIn?: () => void
  accessibilityRole?: AccessibilityRole
  accessibilityState?: {
    selected: boolean
  }
  accessibilityLabel?: string
  testID?: string
  disabled?: boolean
  activeOpacity?: number
  background?: string | null | undefined
  border?: string | null | undefined
}
