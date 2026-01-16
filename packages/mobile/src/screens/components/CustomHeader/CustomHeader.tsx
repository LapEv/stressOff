import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Shadow, TextTitle, Text, View, ViewStyle, Touchable } from 'components'
import { BackSVG, NotificationsSVG } from '@/assets/icons/SVG'
import { RootState } from 'store'
import { ICustomHeader } from './interfaces'
import { INOTIFICATIONS } from '@/store/interfaces'
import { useTheme } from '@/hooks'

export const CustomHeader = ({ navigation, label, type }: ICustomHeader) => {
  const [{ BACKGROUNDCOLOR_HEADER, ITEM_COLOR, borderColorRGBA }] = useTheme()
  const dbNotifications = useSelector<RootState>(
    state => state.db.notifications,
  ) as INOTIFICATIONS[]
  const screen = navigation.getState().routes[navigation.getState().index].name
  const [countNotReaded, setCountNotReaded] = useState<number>(0)

  useEffect(() => {
    const notificationsReaded = dbNotifications
      .map(value => value.unread)
      .filter(value => value).length
    setCountNotReaded(notificationsReaded)
  }, [dbNotifications])

  const borderColor = borderColorRGBA
  return (
    <Shadow style={styles.shadow} type="header" distance={20}>
      <ViewStyle
        style={{ ...styles.container, borderBottomColor: borderColor }}
        type="header">
        {screen !== 'PlayerScreen' && type !== 'auth' ? (
          <View style={styles.containerBack}>
            <Touchable
              style={styles.containerTouch}
              onPress={navigation.goBack}>
              <BackSVG width="70%" height="70%" fill={ITEM_COLOR} />
            </Touchable>
          </View>
        ) : (
          <View style={styles.containerTouch}></View>
        )}
        <TextTitle style={styles.text} type="title_20b">
          {label}
        </TextTitle>
        {type !== 'auth' ? (
          <ViewStyle style={styles.containerButtons}>
            <Touchable
              type="noColor"
              style={{
                ...styles.containerTouch,
                backgroundColor: BACKGROUNDCOLOR_HEADER,
              }}
              onPress={() =>
                navigation.navigate('NotificationsScreen', {
                  screen: 'NotificationsScreen',
                })
              }>
              <NotificationsSVG width="90%" height="90%" fill={ITEM_COLOR} />
              {countNotReaded > 0 && (
                <ViewStyle style={styles.containerCheck} type="check">
                  <Text type="text_12">{countNotReaded}</Text>
                </ViewStyle>
              )}
            </Touchable>
          </ViewStyle>
        ) : (
          <ViewStyle style={styles.containerButtons}></ViewStyle>
        )}
      </ViewStyle>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  shadow: {
    height: 77,
    width: '100%',
    opacity: 1,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    padding: 20,
    height: 77,
    zIndex: 199,
    borderBottomWidth: 0.2,
  },
  containerBack: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerTouch: {
    width: 30,
    height: 30,
    opacity: 0.95,
    zIndex: 1,
    paddingTop: 5,
  },
  containerButtons: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  containerCheck: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: 70,
    right: -12,
    top: -8,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: 25,
  },
})
