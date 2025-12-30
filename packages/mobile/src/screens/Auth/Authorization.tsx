import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import { IAuthorization } from './interfaces'
import {
  FloatLabelInput,
  LinearGradient,
  ShadowTouchable,
  Text,
  TextTitle,
  View,
} from '@/components'
import { dataApp } from '@/data/dataApp'
import { login, registration } from '@/api/userAPI'
import { IError } from '@/store/interfaces'
import { checkValidation } from '@/utils/validation'
import { addError } from '@/store/actions/error'
import { bootstrap } from '@/functions/Bootstrap/bootstrap'
import { checkAnonymousData } from '@/functions'

export const Authorization = ({ screen, navigation }: IAuthorization) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const width = useWindowDimensions().width
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const error = useSelector<RootState>(state => state.error) as IError
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!checkValidation('login', username.trim())) return
    if (!checkValidation('password', password)) return
    const { user, token } = await login(username.trim(), password)
    if (user) {
      await bootstrap({ isConnected: true, token, user })
    }
  }

  const handleSignUp = async () => {
    if (!checkValidation('login', username.trim())) return
    if (!checkValidation('email', email.trim())) return
    if (!checkValidation('password', password)) return
    if (!checkValidation('confirmPassword', confirmPassword, password)) return
    const { user, token } = await registration({
      username: username.trim(),
      password,
      email,
    })
    if (user) {
      await bootstrap({ isConnected: true, token, user })
    }
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
  }, [username, email, password, confirmPassword])

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient style={{ width: '100%' }}>
        <View style={Platform.OS === 'web' ? styles.web : styles.mobile}>
          <Text type="text_30">
            {screen === 'LoginScreen'
              ? language.headerTitle.login
              : language.headerTitle.signUp}
          </Text>
          <View style={styles.floatingItem}>
            <FloatLabelInput
              isPassword={false}
              label="Логин"
              value={username}
              hintTextColor={theme.TEXT_COLOR}
              containerStyles={styles.fliContainerStyles}
              onChangeText={setUsername}
            />
          </View>
          {screen === 'SignUpScreen' && (
            <View style={styles.floatingItem}>
              <FloatLabelInput
                isPassword={false}
                label="Email"
                value={email}
                hintTextColor={theme.TEXT_COLOR}
                containerStyles={styles.fliContainerStyles}
                onChangeText={setEmail}
              />
            </View>
          )}
          <View style={styles.floatingItem}>
            <FloatLabelInput
              isPassword={true}
              label="Password"
              value={password}
              togglePassword={false}
              hintTextColor={theme.TEXT_COLOR}
              containerStyles={styles.fliContainerStyles}
              onChangeText={setPassword}
            />
          </View>
          {screen === 'SignUpScreen' && (
            <View style={styles.floatingItem}>
              <FloatLabelInput
                isPassword={true}
                label="Confirm Password"
                value={confirmPassword}
                togglePassword={false}
                hintTextColor={theme.TEXT_COLOR}
                containerStyles={styles.fliContainerStyles}
                onChangeText={setConfirmPassword}
              />
            </View>
          )}
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
              onPress={screen === 'LoginScreen' ? handleLogin : handleSignUp}>
              <TextTitle type="title_20b">
                {screen === 'LoginScreen'
                  ? language.buttons.signIn
                  : language.buttons.signUp}
              </TextTitle>
            </ShadowTouchable>
          </View>
          <View style={styles.optionsContainer}>
            {screen === 'SignUpScreen' ? (
              <View style={styles.view}>
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
            ) : (
              <View style={styles.optionsInContainer}>
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
                <View style={styles.viewSignUp}>
                  <Text type="text_12">{language.Messages.forgotPassword}</Text>
                  <ShadowTouchable
                    styleshadow={{
                      ...styles.shadow,
                      width: width * 0.45 > 120 ? width * 0.45 : 120,
                      borderColor: theme.CHECK_COLOR,
                    }}
                    style={styles.touchChange}
                    containerStyle={styles.shadow2Container}
                    onPress={() =>
                      navigation.navigate('ResetPasswordScreen', {
                        screen: 'ResetPasswordScreen',
                      })
                    }>
                    <TextTitle type="title_16b">
                      {language.buttons.resetPassword}
                    </TextTitle>
                  </ShadowTouchable>
                </View>
              </View>
            )}
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
    marginTop: 20,
    marginVertical: 15,
    paddingLeft: 15,
  },
  fliContainerStyles: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    paddingRight: 10,
  },
  fliContainerStylesDescription: {
    borderWidth: 1,
    borderRadius: 10,
    height: 160,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLocation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 10,
    minWidth: Platform.OS === 'web' ? 180 : 150,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 25,
    width: '100%',
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
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSignUp: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  withoutAccount: {
    marginTop: 70,
    height: 70,
    textAlignVertical: 'center',
  },
})
