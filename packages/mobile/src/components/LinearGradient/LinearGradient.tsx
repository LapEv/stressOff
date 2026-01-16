import { LinearGradient as DefaultLinearGradient } from 'expo-linear-gradient'
import { ILinearGradient } from './interfaces'
import { dataApp } from '@/data/dataApp'
import { useTheme } from '@/hooks'

export const LinearGradient = (props: ILinearGradient) => {
  const [{ BACKGROUNDCOLOR_LG, BACKGROUNDCOLOR_LG_Disabled }] = useTheme()
  const { style, type, ...otherProps } = props
  const mainStyle = dataApp.MAIN_BACKGROUNDSTYLES as
    | Record<string, unknown>
    | undefined
  const colors =
    type === 'disabled' ? BACKGROUNDCOLOR_LG_Disabled : BACKGROUNDCOLOR_LG
  return (
    <DefaultLinearGradient
      colors={colors}
      style={[mainStyle, style]}
      {...otherProps}
    />
  )
}
