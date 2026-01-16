import React, { useState } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IFeedBack } from './interfaces'
import { RootState } from '@/store'
import { dataApp } from '@/data/dataApp'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { IntervalFeedback } from '@/store/actions/intervalFeedback'
import {
  FloatLabelInput,
  LinearGradient,
  Shadow,
  TextTitle,
  Touchable,
  View,
} from '@/components'
import { CustomHeader } from '../components'
import { checkValidation } from '@/utils/validation'
import { ITheme } from '@/theme/interfaces'
import * as SecureStore from 'expo-secure-store'
import { useLanguage } from '@/hooks'

export const FeedBackScreen = ({ navigation }: IFeedBack) => {
  const [{ feedback, modalMessages, headerTitle }] = useLanguage()
  const dateFeedback = useSelector<RootState>(
    state => state.intervalFeedback.date,
  ) as Date
  const width = useWindowDimensions().width
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [timestmp, setTimeStmp] = useState<Date>(dateFeedback)

  const CheckFirstNameMax = (value: string) => {
    value.length <= dataApp.feedback.maxLengthFirstName
      ? (setFirstName(value), errorMessage ? setErrorMessage('') : null)
      : (setFirstName(value), setErrorMessage(feedback.errors.maxLengthName))
  }

  const CheckTopicMax = (value: string) => {
    value.length <= dataApp.feedback.maxLengthTopic
      ? (setTopic(value), errorMessage ? setErrorMessage('') : null)
      : (setTopic(value), setErrorMessage(feedback.errors.maxLengthTopic))
  }

  const CheckDescriptionMax = (value: string) => {
    value.length <= dataApp.feedback.maxLengthDescription
      ? (setDescription(value), errorMessage ? setErrorMessage('') : null)
      : (setDescription(value),
        setErrorMessage(feedback.errors.maxLengthDescription))
  }

  const сlearFields = () => {
    setFirstName('')
    setTopic('')
    setEmail('')
    setDescription('')
  }

  async function setAsyncStorageTimeRequest() {
    const date = new Date()
    try {
      return SecureStore.setItemAsync(
        dataApp.STORAGE_KEYS.feedbackInterval,
        JSON.stringify(date),
      )
    } catch (e) {
      console.log('SettingsItems: Error: ', e)
    }
  }

  const Submit = async () => {
    const curTime = new Date().getTime()
    const delay =
      dataApp.feedback.intervalSending - curTime - timestmp.getTime() / 1000
    if (timestmp.getTime() - curTime < dataApp.feedback.intervalSending) {
      const formattedTime = new Date(delay * 1000).toUTCString().split(/ /)[4]
      const messageDelay = ` ${formattedTime.substr(
        0,
        2,
      )}h:${formattedTime.substr(3, 2)}m:${formattedTime.substr(6, 2)}s`
      setErrorMessage(feedback.errors.intervalSending + messageDelay)
      return
    }

    !firstName ? setErrorMessage(feedback.errors.emptyName) : null
    if (!firstName) return

    if (firstName.length > dataApp.feedback.maxLengthFirstName) return

    const checkEmail = checkValidation('email', email.trim())
    !checkEmail ? setErrorMessage(feedback.errors.incorrectEmail) : null
    if (!checkEmail) return

    !topic ? setErrorMessage(feedback.errors.emptyTopic) : null
    if (topic.length < dataApp.feedback.minLengthTopic) {
      setErrorMessage(feedback.errors.minLengthTopic)
      return
    }
    if (!topic) return

    !description ? setErrorMessage(feedback.errors.emptyDescription) : null
    if (description.length < dataApp.feedback.minLengthDescription) {
      setErrorMessage(feedback.errors.minLengthDescription)
      return
    }
    if (!description) return

    const value = {
      status: 'new',
      name: firstName,
      email: email,
      topic: topic,
      description: description,
      to: dataApp.request.to,
      message: {
        html: '',
        subject: '',
      },
    }

    const numberRequest = await AddFeedBackToFB(value)
    if (numberRequest) {
      сlearFields()
      modalMessages.feedbackSuccess.message =
        feedback.resultSuccess + numberRequest.request
      dispatch(modalShowMessage(modalMessages.feedbackSuccess))
      setTimeStmp(new Date())
      setAsyncStorageTimeRequest()
      dispatch(IntervalFeedback(new Date()))
      navigation.navigate('SettingsScreen', { screen: 'SettingsScreen' })
      return
    }
    modalMessages.error.message = feedback.resultError + `${numberRequest}`
    dispatch(modalShowMessage(modalMessages.error))
  }

  const shadowitems = {
    width: (width / 2) * 0.8,
    height: 60,
    borderRadius: 15,
    style: {
      margin: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
  }

  const fliStyles = {
    containerStyles: {
      borderWidth: 1,
      paddingHorizontal: 10,
      borderColor: theme.ITEM_COLOR,
      borderRadius: 15,
      height: 60,
      marginVertical: 20,
      color: theme.TEXT_COLOR,
    },
    containerStylesDescription: {
      borderWidth: 1,
      padding: 10,
      borderColor: theme.ITEM_COLOR,
      borderRadius: 15,
      height: 160,
      marginVertical: 20,
      color: theme.TEXT_COLOR,
      textAlignVertical: 'top' as
        | 'auto'
        | 'center'
        | 'top'
        | 'bottom'
        | undefined,
    },
  }

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} label={headerTitle.feedback} />
      <LinearGradient>
        <KeyboardAvoidingView
          style={styles.viewKeyboard}
          behavior="padding"
          enabled
          keyboardVerticalOffset={-350}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContainer}>
            <View style={styles.viewError}>
              {errorMessage ? (
                <TextTitle
                  type="title_16b"
                  colorType="error"
                  style={styles.textError}>
                  {errorMessage}
                </TextTitle>
              ) : null}
            </View>
            <View style={styles.floatingItem}>
              <FloatLabelInput
                isPassword={false}
                label={feedback.firstName}
                value={firstName}
                containerStyles={fliStyles.containerStyles}
                onChangeText={value => CheckFirstNameMax(value)}
              />
            </View>
            <View style={styles.floatingItem}>
              <FloatLabelInput
                isPassword={false}
                label={feedback.emailLabel}
                value={email}
                containerStyles={fliStyles.containerStyles}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.floatingItem}>
              <FloatLabelInput
                isPassword={false}
                label={feedback.topicLabel}
                value={topic}
                containerStyles={fliStyles.containerStyles}
                onChangeText={value => CheckTopicMax(value)}
              />
            </View>
            <View style={styles.viewDescription}>
              <TextInput
                value={description}
                multiline
                numberOfLines={4}
                placeholder={feedback.descriptionLabel}
                placeholderTextColor={'#aaa'}
                style={fliStyles.containerStylesDescription}
                onChangeText={value => CheckDescriptionMax(value)}
              />
            </View>
            <Touchable style={styles.touch} onPress={Submit}>
              <Shadow style={shadowitems}>
                <TextTitle type="title_16b">{feedback.button}</TextTitle>
              </Shadow>
            </Touchable>
            <View style={styles.viewFooter}></View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingItem: {
    width: '70%',
    height: 60,
    marginTop: 20,
    marginVertical: 15,
    paddingLeft: 15,
  },
  viewKeyboard: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewError: {
    width: '90%',
    minHeight: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    textAlign: 'center',
  },
  viewDescription: {
    width: '70%',
    height: 160,
    marginTop: 20,
    marginVertical: 15,
    paddingLeft: 15,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewFooter: {
    width: '100%',
    height: 100,
  },
})
