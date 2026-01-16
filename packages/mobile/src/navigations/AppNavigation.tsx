import React, { RefObject, useEffect } from 'react'
import { BackHandler, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
// import {SettingsScreen} from '../screens/SettingsScreen';
// import {TimerScreen} from '../screens/TimerScreen';
// import {NotificationsScreen} from '../screens/NotificationsScreen';
// import {SectionsTabNavigation} from './SectionsTabNavigation';
// import {LoginNavigation} from './LoginNavigation';
// import { Player } from '../screens/Player/Player'
import { RootState } from '@/store'
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
import { modalShow } from '@/store/actions/modal'
import { verticalAnimationDownUp } from './data'
import { SectionsTabNavigation } from './SectionsTabNavigation'
import { LoginNavigation } from './LoginNavigation'
import { useLanguage } from '@/hooks'
// import {FeedBackScreen} from '../screens/FeedBackScreen';
// import {LanguageScreen} from '../screens/LanguageScreen';
// import {ModalAlert} from '../components/Modal';
// import {ModalMessage} from '../components/ModalMessage';
// import {modalShow} from '../store/actions/modal';
// import {DownloadFromCloud} from '../components/DownloadFromCloud';
// import {DeleteAllFromDevice} from '../components/DeleteAllFromDevice';

// const Stack = createNativeStackNavigator();

const Stack = createStackNavigator<RootStackParamList>()

export const AppNavigation = ({ login, setToken }: IAppNavigation) => {
  const [{ headerTitle, modalMessages }] = useLanguage()
  const token = useSelector<RootState>(state => state.token) as string

  const navigationRef =
    React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>()

  const dispatch = useDispatch()

  const backAction = () => {
    if ((navigationRef.current?.getRootState()?.index as number) <= 0) {
      dispatch(modalShow(modalMessages.exitApp))
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
