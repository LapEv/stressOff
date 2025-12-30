import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { INOTIFICATIONS } from '@/store/interfaces'
import { INotifications } from './interfaces'
import { UpdateNotificationsDB } from '@/store/actions/db'
import { CustomHeader } from '../components'
import { LinearGradient, Text, View } from '@/components'
import { curLanguage } from '@/localization/language'
import { NotificationTiles } from './NotificationTiles'
// import { NotificationTiles } from '../components/NotificationTiles'
// import { CONST } from '../const'
// import { UpdateNotificationsDB } from '../store/actions/db'
// import { THEME } from '../theme'

export const NotificationsScreen = ({ navigation }: INotifications) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const notificationsDB = useSelector<RootState>(
    state => state.db.notifications,
  ) as INOTIFICATIONS[]

  // const formatDate = (date: string) => {
  //   const localDate = new Date(date).toLocaleDateString().split('/').join('.')
  //   const localTime = new Date(date).toLocaleTimeString()
  //   return `${localDate} ${localTime}`
  // }

  const renderItem = (item: INOTIFICATIONS) => {
    const curLanguage = language.name as curLanguage
    return (
      <NotificationTiles
        id={item.id}
        // date={formatDate(item.date)}
        date={item.date}
        title={item.title[curLanguage]}
        body={item.body[curLanguage]}
        unread={item.unread}
        screen={item.category}
        section={item.navigation}
        languageName={language.name}
        navigation={navigation}
      />
    )
  }

  const dispatch = useDispatch()
  const handleViewableItemsChanged = React.useRef(viewableItems => {
    viewableItems.changed.forEach(value => {
      if (value.isViewable && value.item.unread) {
        dispatch(
          UpdateNotificationsDB({
            id: value.item.id,
          }),
        )
      }
    })
  })

  return (
    <View style={styles.container}>
      <CustomHeader
        navigation={navigation}
        label={language.headerTitle.notifications}
      />
      <LinearGradient
        style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        {!notificationsDB.length && (
          <View style={{ marginTop: 20 }}>
            <Text type="text_14">{language.notifications.noNotifications}</Text>
          </View>
        )}
        {notificationsDB.length > 0 && (
          <View style={styles.screenTop}>
            <FlatList
              contentContainerStyle={styles.flatContainer}
              data={notificationsDB}
              viewabilityConfig={{
                minimumViewTime: 1500,
                viewAreaCoveragePercentThreshold: 60,
              }}
              onViewableItemsChanged={handleViewableItemsChanged.current}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <View style={styles.flatContainer}>
                  <View style={styles.viewFooter}></View>
                </View>
              }
            />
          </View>
        )}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTop: {
    width: '100%',
    marginTop: 20,
  },
  flatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFooter: {
    width: '100%',
    height: 120,
  },
})
