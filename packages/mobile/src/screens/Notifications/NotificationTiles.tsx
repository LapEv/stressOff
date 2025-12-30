import { TextTitle, Touchable, ViewStyle, Text } from '@/components'
import { RootState } from '@/store'
import { INOTIFICATIONS, IUser } from '@/store/interfaces'
import React, { useState, useEffect } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useSelector } from 'react-redux'

export const NotificationTiles = ({
  id,
  date,
  title,
  body,
  unread,
  screen,
  section,
  languageName,
  navigation,
}) => {
  const user = useSelector<RootState>(state => state.user) as IUser
  const dbNotifications = useSelector<RootState>(
    state => state.db.notifications,
  ) as INOTIFICATIONS[]
  const width = useWindowDimensions().width
  const [isUnread, setReaded] = useState(unread)

  useEffect(() => {
    const status = dbNotifications.find(value => value.id === id)?.unread
    isUnread && !status
      ? (setReaded(unread), updateStatusUnreadNotification(id, user._id))
      : null
  }, [dbNotifications])

  const redirectToScreen = () => {
    if (screen) {
      navigation.navigate('SectionsTabNavigation', {
        screen: section,
        params: {
          screen: screen[languageName],
          scrollToEnd: true,
        },
      })
    }
  }

  return (
    <Touchable
      style={styles.container}
      onPress={redirectToScreen}
      disabled={screen ? false : true}>
      <TextTitle type="text_14b">{date}</TextTitle>
      <ViewStyle style={{ ...styles.view, width: width * 0.9 }}>
        {!isUnread ? (
          <Text type="text_14b">{title}</Text>
        ) : (
          <TextTitle type="title_16b">{title}</TextTitle>
        )}
        <Text
          type={!isUnread ? 'text_12' : 'text_14b'}
          style={{ marginTop: 10 }}>
          {body}
        </Text>
      </ViewStyle>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  view: {
    minHeight: 80,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
  },
})
