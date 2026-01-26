import React, { RefObject, useEffect } from 'react'
import { BackHandler, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import {
  FeedBackScreen,
  LanguageScreen,
  ModalAlert,
  ModalMessage,
  NotificationsScreen,
  PlayerScreen,
  SettingsScreen,
  TimerScreen,
} from '@/screens'
import { IAppNavigation, RootStackParamList } from './interfaces'
import { verticalAnimationDownUp } from './data'
import { SectionsTabNavigation } from './SectionsTabNavigation'
import { LoginNavigation } from './LoginNavigation'
import { useLanguage, useModal, useToken } from '@/hooks'

const Stack = createStackNavigator<RootStackParamList>()

export const AppNavigation = ({ login, setToken }: IAppNavigation) => {
  const [{ headerTitle, modalMessages }] = useLanguage()
  const [, { showModal }] = useModal()
  const [token] = useToken()

  const navigationRef =
    React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>()

  const backAction = () => {
    if ((navigationRef.current?.getRootState()?.index as number) <= 0) {
      showModal(modalMessages.exitApp)
    } else {
      navigationRef.current?.goBack()
    }
    return true
  }

  useEffect(() => {
    setToken(token)
    if (token) {
      const navigation = navigationRef as RefObject<
        NavigationContainerRef<RootStackParamList>
      >
      navigation.current?.navigate('PlayerScreen', { screen: 'PlayerScreen' })
    }
  }, [token])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )
    return () => backHandler.remove()
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <View>
        <ModalAlert />
      </View>
      <View>
        <ModalMessage
          navigation={
            navigationRef as RefObject<
              NavigationContainerRef<RootStackParamList>
            >
          }
        />
      </View>
      {/* <View>
        <DownloadFromCloud />
      </View>
      <View>
        <DeleteAllFromDevice />
      </View> */}
      <Stack.Navigator
        initialRouteName={!login ? 'LoginNavigation' : 'PlayerScreen'}>
        <Stack.Screen
          name="SectionsTabNavigation"
          component={SectionsTabNavigation}
          options={verticalAnimationDownUp}
        />
        <Stack.Screen
          name="LoginNavigation"
          component={LoginNavigation}
          // options={verticalAnimationDownUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlayerScreen"
          component={PlayerScreen}
          options={{
            ...verticalAnimationDownUp,
            title: headerTitle.player,
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          // options={{
          //   ...verticalAnimationDownUp,
          //   title: headerTitle.settings,
          // }}
        />
        <Stack.Screen
          name="FeedBackScreen"
          component={FeedBackScreen}
          // options={{
          //   ...verticalAnimationDownUp,
          //   title: headerTitle.feedback,
          // }}
        />
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
          // options={{
          //   ...verticalAnimationDownUp,
          //   title: headerTitle.language,
          // }}
        />
        <Stack.Screen
          name="TimerScreen"
          component={TimerScreen}
          // options={{
          //   ...verticalAnimationDownUp,
          //   title: headerTitle.timer,
          // }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          // options={{
          //   ...verticalAnimationDownUp,
          //   title: headerTitle.notifications,
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
