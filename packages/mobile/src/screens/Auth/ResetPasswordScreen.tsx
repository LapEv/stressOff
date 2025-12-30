import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native'
import { useSelector } from 'react-redux'
import { IResetPassword } from './interfaces'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import {
  FloatLabelInput,
  LinearGradient,
  ShadowTouchable,
  Text,
  TextTitle,
  View,
} from '@/components'
import { dataApp } from '@/data/dataApp'
import { IError } from '@/store/interfaces'
import { checkValidation } from '@/utils/validation'
import { useDispatch } from 'react-redux'
import { addError } from '@/store/actions/error'
import { resetPassword } from '@/api/userAPI'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { checkAnonymousData } from '@/functions'

export const ResetPasswordScreen = ({ navigation }: IResetPassword) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const width = useWindowDimensions().width
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const error = useSelector<RootState>(state => state.error) as IError
  const [reset, setResetPassword] = useState('')
  const dispatch = useDispatch()

  const handleResetPassword = async () => {
    if (!checkValidation('email', reset)) return
    await resetPassword(reset)
    dispatch(
      modalShowMessage({
        typeMessage: 'resetPassWord',
        message: language.Messages.resetPassword,
        show: true,
        buttonYes: 'OK',
        title: 'Смена пароля',
      }),
    )
  }

  const continueWithoutAccount = () => {
    checkAnonymousData()
  }

  const clearError = () => {
    dispatch(
      addError({
        status: 0,
        message: '',
      }),
    )
  }

  useEffect(() => {
    clearError()
  }, [])

  useEffect(() => {
    clearError()
  }, [reset])

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient style={{ width: '100%' }}>
        <View style={Platform.OS === 'web' ? styles.web : styles.mobile}>
          <Text type="text_30">{language.headerTitle.resetPassword} </Text>
          <View style={styles.floatingItem}>
            <FloatLabelInput
              isPassword={false}
              label="Email"
              value={reset}
              hintTextColor={theme.TEXT_COLOR}
              containerStyles={styles.fliContainerStyles}
              onChangeText={setResetPassword}
            />
          </View>
          <View style={{ height: 20 }}>
            {(error.status as number) > 0 && (
              <TextTitle
                type="title_14"
                colorType="error"
                style={{ textAlign: 'center' }}>
                {error.message}
              </TextTitle>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <ShadowTouchable
              background={null}
              styleshadow={{ ...styles.shadow, borderColor: theme.CHECK_COLOR }}
              style={{
                ...styles.touchChange,
                width: width / dataApp.timer.numberColumns,
              }}
              containerStyle={styles.shadowContainer}
              onPress={handleResetPassword}>
              <TextTitle type="title_20b">
                {language.buttons.resetPassword}
              </TextTitle>
            </ShadowTouchable>
          </View>
          <View style={styles.optionsContainer}>
            <View style={styles.viewSignUp}>
              <Text type="text_12">{language.Messages.hasAccount}</Text>
              <ShadowTouchable
                styleshadow={{
                  ...styles.shadow,
                  width: width * 0.45 > 120 ? width * 0.45 : 120,
                  borderColor: theme.CHECK_COLOR,
                }}
                style={styles.touchChange}
                containerStyle={styles.shadow2Container}
                onPress={() =>
                  navigation.navigate('LoginScreen', {
                    screen: 'LoginScreen',
                  })
                }>
                <TextTitle type="title_16b">
                  {language.buttons.signIn}
                </TextTitle>
              </ShadowTouchable>
            </View>
            <View style={styles.viewSignUp}>
              <Text type="text_12">{language.Messages.noAccount}</Text>
              <ShadowTouchable
                styleshadow={{
                  ...styles.shadow,
                  width: width * 0.45 > 120 ? width * 0.45 : 120,
                  borderColor: theme.CHECK_COLOR,
                }}
                style={styles.touchChange}
                containerStyle={styles.shadow2Container}
                onPress={() =>
                  navigation.navigate('SignUpScreen', {
                    screen: 'SignUpScreen',
                  })
                }>
                <TextTitle type="title_16b">
                  {language.buttons.signUp}
                </TextTitle>
              </ShadowTouchable>
            </View>
          </View>
          <TextTitle
            type="title_16b"
            style={styles.withoutAccount}
            onPress={continueWithoutAccount}>
            {language.Messages.continueWithoutAccount}
          </TextTitle>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  web: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobile: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingItem: {
    width: '70%',
    height: 60,
    marginTop: 8,
    marginVertical: 15,
    paddingLeft: 15,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 70,
    paddingBottom: 10,
    width: '100%',
    color: 'white',
  },
  touchReset: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shadowReset: {
    margin: 30,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  touchSignIn: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewSignUp: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  touchSignUp: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fliContainerStyles: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    paddingRight: 10,
  },
  touchChange: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  shadow: {
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  shadowContainer: {
    marginTop: 30,
  },
  shadow2Container: {
    marginTop: 10,
  },
  withoutAccount: {
    marginTop: 70,
    height: 70,
    textAlignVertical: 'center',
  },
})
