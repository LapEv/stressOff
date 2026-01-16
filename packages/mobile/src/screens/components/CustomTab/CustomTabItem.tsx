import { Shadow, Touchable, View } from '@/components'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { ICustomTabItem, IOptionsTabStyle } from './interfaces'
import Theme from '@/theme/Theme'
import { useTheme } from '@/hooks'

export const CustomTabItem = ({
  state,
  navigation,
  id,
  value,
  options,
  myList,
}: ICustomTabItem) => {
  const [{ TEXT_COLOR, CHECK_COLOR, BACKGROUNDCOLOR }] = useTheme()
  const fadeAnim = useRef(new Animated.Value(0.6)).current
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [optionsStyle, setOptionsStyle] = useState<IOptionsTabStyle>({
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
    myList.current
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
      button: {
        ...styles.buttonMain,
        color: state.index == id - 1 ? CHECK_COLOR : BACKGROUNDCOLOR,
        opacity: 1,
      },
      touch: {
        ...styles.touchButton,
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
      style={optionsStyle.button}
      containerStyle={optionsStyle.container}
      distance={7}>
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
            navigation.navigate(value?.name as string, {
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
        style={optionsStyle.touch}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View>{(options?.tabBarIcon as () => ReactNode)()}</View>
        </Animated.View>
        <Animated.Text
          style={[
            Theme.text_12,
            {
              opacity: fadeAnim,
              color: TEXT_COLOR,
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
