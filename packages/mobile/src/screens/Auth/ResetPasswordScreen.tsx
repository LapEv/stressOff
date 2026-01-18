import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native'
import { IResetPassword } from './interfaces'
import {
  FloatLabelInput,
  LinearGradient,
  ShadowTouchable,
  Text,
  TextTitle,
  View,
} from '@/components'
import { dataApp } from '@/data/dataApp'
import { checkValidation } from '@/utils/validation'
import { resetPassword } from '@/api/userAPI'
import { checkAnonymousData } from '@/functions'
import { useError, useLanguage, useModalMeessage, useTheme } from '@/hooks'

export const ResetPasswordScreen = ({ navigation }: IResetPassword) => {
  const [{ headerTitle, buttons, Messages }] = useLanguage()
  const [{ TEXT_COLOR, CHECK_COLOR }] = useTheme()
  const [error, { clearError }] = useError()
  const [, { showModalMessage }] = useModalMeessage()
  const width = useWindowDimensions().width
  const [reset, setResetPassword] = useState('')

  const handleResetPassword = async () => {
    if (!checkValidation('email', reset)) return
    await resetPassword(reset)
    showModalMessage({
      typeMessage: 'resetPassWord',
      message: Messages.resetPassword,
      show: true,
      buttonYes: 'OK',
      title: 'Смена пароля',
    })
  }

  const continueWithoutAccount = () => {
    checkAnonymousData()
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
          <Text type="text_30">{headerTitle.resetPassword} </Text>
          <View style={styles.floatingItem}>
            <FloatLabelInput
              isPassword={false}
              label="Email"
              value={reset}
              hintTextColor={TEXT_COLOR}
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
              styleshadow={{ ...styles.shadow, borderColor: CHECK_COLOR }}
              style={{
                ...styles.touchChange,
                width: width / dataApp.timer.numberColumns,
              }}
              containerStyle={styles.shadowContainer}
              onPress={handleResetPassword}>
              <TextTitle type="title_20b">{buttons.resetPassword}</TextTitle>
            </ShadowTouchable>
          </View>
          <View style={styles.optionsContainer}>
            <View style={styles.viewSignUp}>
              <Text type="text_12">{Messages.hasAccount}</Text>
              <ShadowTouchable
                styleshadow={{
                  ...styles.shadow,
                  width: width * 0.45 > 120 ? width * 0.45 : 120,
                  borderColor: CHECK_COLOR,
                }}
                style={styles.touchChange}
                containerStyle={styles.shadow2Container}
                onPress={() =>
                  navigation.navigate('LoginScreen', {
                    screen: 'LoginScreen',
                  })
                }>
                <TextTitle type="title_16b">{buttons.signIn}</TextTitle>
              </ShadowTouchable>
            </View>
            <View style={styles.viewSignUp}>
              <Text type="text_12">{Messages.noAccount}</Text>
              <ShadowTouchable
                styleshadow={{
                  ...styles.shadow,
                  width: width * 0.45 > 120 ? width * 0.45 : 120,
                  borderColor: CHECK_COLOR,
                }}
                style={styles.touchChange}
                containerStyle={styles.shadow2Container}
                onPress={() =>
                  navigation.navigate('SignUpScreen', {
                    screen: 'SignUpScreen',
                  })
                }>
                <TextTitle type="title_16b">{buttons.signUp}</TextTitle>
              </ShadowTouchable>
            </View>
          </View>
          <TextTitle
            type="title_16b"
            style={styles.withoutAccount}
            onPress={continueWithoutAccount}>
            {Messages.continueWithoutAccount}
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
