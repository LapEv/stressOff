import { LinearGradient as DefaultLinearGradient } from 'expo-linear-gradient'
import { ILinearGradient } from './interfaces'
import { RootState } from 'store'
import { ITheme } from 'theme/interfaces'
import { useSelector } from 'react-redux'
import { dataApp } from '@/data/dataApp'

export const LinearGradient = (props: ILinearGradient) => {
  const { style, type, ...otherProps } = props
  const mainStyle = dataApp.MAIN_BACKGROUNDSTYLES as
    | Record<string, unknown>
    | undefined
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const colors =
    type === 'disabled'
      ? theme.BACKGROUNDCOLOR_LG_Disabled
      : theme.BACKGROUNDCOLOR_LG
  return (
    <DefaultLinearGradient
      colors={colors}
      style={[mainStyle, style]}
      {...otherProps}
    />
  )
}
