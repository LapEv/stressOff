import React from 'react'
import { StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { ITimeData, ITimer } from './interfaces'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { dataApp } from '@/data/dataApp'
import { LinearGradient, View } from '@/components'
import { CustomHeader } from '../components'
import { TimePicker } from './TimePicker'
import { TimeView } from './TimeView'
import { TimerTiles } from './TimerTiles'

export const TimerScreen = ({ navigation }: ITimer) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions

  const timerData = [
    {
      id: '1',
      title: `${dataApp.timer.time1 / 60000} ${language.timer.mins}`,
      duration: dataApp.timer.time1,
    },
    {
      id: '2',
      title: `${dataApp.timer.time2 / 60000} ${language.timer.mins}`,
      duration: dataApp.timer.time2,
    },
    {
      id: '3',
      title: `${dataApp.timer.time3 / 60000} ${language.timer.mins}`,
      duration: dataApp.timer.time3,
    },
    {
      id: '4',
      title: `${dataApp.timer.time4 / 60000} ${language.timer.mins}`,
      duration: dataApp.timer.time4,
    },
    {
      id: '5',
      title: `${dataApp.timer.time5 / 3600000} ${language.timer.hour}`,
      duration: dataApp.timer.time5,
    },
    {
      id: '6',
      title: `${dataApp.timer.time6 / 3600000} ${language.timer.hours}`,
      duration: dataApp.timer.time6,
    },
    {
      id: '7',
      title: language.timer.individual,
      duration: 0,
    },
  ]

  const renderItem = ({ id, title, duration }: ITimeData) => {
    return <TimerTiles id={id} title={title} duration={duration} />
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <TimePicker />}
      <CustomHeader
        navigation={navigation}
        label={language.headerTitle.timer}
      />
      <LinearGradient>
        <FlatList
          horizontal={false}
          numColumns={dataApp.timer.numberColumns}
          contentContainerStyle={styles.screen}
          data={timerData}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            <View style={styles.viewFooter}>
              <TimeView on={true} />
              {Platform.OS === 'android' && <TimePicker />}
              <View style={styles.view}></View>
            </View>
          }
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  viewFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: '100%',
    height: 150,
  },
})
