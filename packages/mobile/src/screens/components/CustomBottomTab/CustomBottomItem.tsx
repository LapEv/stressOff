import { Shadow, Touchable, View } from '@/components'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { ICustomBottomItem, IOptionsBottomStyle } from './interfaces'
import { useTheme } from '@/hooks'

export const CustomBottomItem = ({
  state,
  navigation,
  id,
  value,
  options,
  myList,
}: ICustomBottomItem) => {
  const [{ TEXT_COLOR, CHECK_COLOR, BACKGROUNDCOLOR, borderColorRGBA }] =
    useTheme()
  const fadeAnim = useRef(new Animated.Value(0.6)).current
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [optionsStyle, setOptionsStyle] = useState<IOptionsBottomStyle>({
    buttonMain: {},
    button: {},
    touch: {},
    container: {},
  })
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
    myList?.current
      ? myList.current.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5,
        })
      : null
  }

  useEffect(() => {
    state.index === id - 1 ? scrollToIndex(id - 1) : null
    state.index === id - 1 ? fadeIn() : fadeOut()
    const styleOptions = {
      buttonMain: {
        ...styles.shadowBottomTabItemMain,
        color: state.index == id - 1 ? CHECK_COLOR : BACKGROUNDCOLOR,
      },
      button: {
        ...styles.shadowBottomTabItem,
        color: state.index == id - 1 ? CHECK_COLOR : BACKGROUNDCOLOR,
      },
      touch: {
        ...styles.bottomTabItemTouch,
        width: id === 1 || id === 4 ? 70 : 90,
        height: id === 1 || id === 4 ? 60 : 80,
        borderColor: borderColorRGBA,
        borderWidth: state.index != id - 1 ? 1 : 2,
      },
      container: {
        ...styles.containerStyle,
        marginLeft: id === 1 ? 10 : 0,
      },
    }
    setOptionsStyle(styleOptions)
  }, [state])

  return (
    <Shadow
      style={
        id === 1 || id === 4 ? optionsStyle.button : optionsStyle.buttonMain
      }
      containerStyle={optionsStyle.container}>
      <Touchable
        accessibilityRole="button"
        accessibilityState={state.index === id ? { selected: true } : undefined}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        onPress={() => {
          const event = navigation.emit({
            type: 'tabPress',
            target: value.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(value.name)
          }
        }}
        onLongPress={() => {
          navigation.emit({
            type: 'tabLongPress',
            target: value.key,
          })
        }}
        style={optionsStyle.touch}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View>{(options?.tabBarIcon as () => ReactNode)()}</View>
        </Animated.View>
        <Animated.Text
          style={{
            opacity: fadeAnim,
            color: TEXT_COLOR,
            fontSize: id === 1 || id === 4 ? 9 : 12,
          }}>
          {options.tabBarLabel as string}
        </Animated.Text>
      </Touchable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  touchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    zIndex: 99,
  },
  shadowBottomTabItemMain: {
    width: 90,
    height: 80,
    opacity: 0.9,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  shadowBottomTabItem: {
    width: 70,
    height: 60,
    opacity: 0.9,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabItemTouch: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    zIndex: 99,
  },
  containerStyle: {
    marginRight: 10,
  },
})
