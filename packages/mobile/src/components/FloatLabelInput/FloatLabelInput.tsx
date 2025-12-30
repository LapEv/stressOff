import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import React from 'react'
import { FloatingLabelInput } from 'react-native-floating-label-input'
import { useSelector } from 'react-redux'
import { IFloatLabelInput } from './interfaces'

export const FloatLabelInput = (props: IFloatLabelInput) => {
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const fliStyles = {
    customLabelStyles: {
      colorFocused: '#aaa',
      colorBlurred: '#aaa',
      fontSizeFocused: 12,
      fontSizeBlurred: 16,
    },
    labelStyles: {
      paddingHorizontal: 5,
      paddingTop: 0,
      color: '#aaa',
    },
    inputStyles: {
      color: theme.TEXT_COLOR,
      paddingTop: 20,
      paddingHorizontal: 10,
      fontSize: 18,
    },
  }

  const borderStyle = { borderColor: theme.CHECK_COLOR }
  return (
    <FloatingLabelInput
      label={props.label}
      value={props.value}
      isPassword={props.isPassword}
      togglePassword={props.togglePassword}
      hintTextColor={props.hintTextColor}
      onChangeText={props.onChangeText}
      animationDuration={300}
      containerStyles={{ ...borderStyle, ...props.containerStyles }}
      customLabelStyles={fliStyles.customLabelStyles}
      labelStyles={fliStyles.labelStyles}
      inputStyles={fliStyles.inputStyles}
    />
  )
}
