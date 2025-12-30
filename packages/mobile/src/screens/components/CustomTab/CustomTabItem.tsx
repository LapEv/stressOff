import { Shadow, Touchable, View } from '@/components'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import React, { ReactNode, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { ICustomTabItem } from './interfaces'
import Theme from '@/theme/Theme'

export const CustomTabItem = ({
  state,
  navigation,
  id,
  value,
  options,
  myList,
}: ICustomTabItem) => {
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const fadeAnim = useRef(new Animated.Value(0.6)).current
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const scrollToIndex = (index: number) => {
    setIsFocused(false)
    myList.current
      ? myList.current.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5,
        })
      : null
  }

  state.index === id - 1 ? scrollToIndex(id - 1) : null
  state.index === id - 1 ? fadeIn() : fadeOut()

  const button = {
    ...styles.buttonMain,
    color: state.index == id - 1 ? theme.CHECK_COLOR : theme.BACKGROUNDCOLOR,
  }

  const touch = {
    ...styles.touchButton,
    borderWidth: state.index != id - 1 ? 1 : 2,
  }

  const container = {
    ...styles.containerStyle,
    marginLeft: id === 1 ? 10 : 0,
  }

  return (
    <Shadow style={button} containerStyle={container}>
      <Touchable
        key={value?.key}
        accessibilityRole="button"
        accessibilityState={state.index === id ? { selected: true } : undefined}
        onPress={() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: value?.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(value?.name, {
              screen: value?.name,
            })
          }
        }}
        onLongPress={() => {
          console.log('onLongPress = ')
          navigation.emit({
            type: 'tabLongPress',
            target: value?.key,
          })
        }}
        style={touch}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View>{(options?.tabBarIcon as () => ReactNode)()}</View>
        </Animated.View>
        <Animated.Text
          style={[
            Theme.text_12,
            {
              opacity: fadeAnim,
              color: theme.TEXT_COLOR,
              paddingTop: 5,
            },
          ]}>
          {options?.title}
        </Animated.Text>
      </Touchable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  touchButton: {
    width: 90,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    borderRadius: 15,
  },
  buttonMain: {
    width: 90,
    height: 75,
    opacity: 0.9,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  containerStyle: {
    marginRight: 10,
  },
})
