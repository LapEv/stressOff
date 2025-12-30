import React, { useRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Props } from './interfaces'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { ISOUNDS, ISoundStateItems } from '@/store/interfaces'
import { curLanguage } from '@/localization/language'
import { SoundsTiles } from '../Sounds/SoundTiles'
import { LinearGradient, TextTitle, View } from '@/components'
import { dataApp } from '@/data/dataApp'
import { ILocalizationOptions } from '@/localization/interfaces'

export const BookedScreenSounds = ({ route }: Props) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const soundDB = useSelector<RootState>(state => state.db.sounds) as ISOUNDS[]
  const playingDataSound = (
    useSelector<RootState>(
      state => state.sound.mixedSound,
    ) as ISoundStateItems[]
  ).map(value => (value.id ? value.id : ''))

  const data = soundDB.filter(value => value.booked)

  const flatlistRef = useRef<FlatList<any> | null>(null)
  const scroll = () => {
    // if (route.params && route.params.scrollToEnd) {
    if (route.params) {
      setTimeout(() => {
        flatlistRef.current?.scrollToEnd({ animated: true })
        // route.params?.scrollToEnd = false
      }, 1000)
    }
  }
  // const scrollToTop = () => {
  //   setTimeout(() => {
  //     flatlistRef.current?.scrollToIndex({ index: 0, animated: true })
  //   }, 1000)
  // }

  const renderItem = ({ id, sound }: ISOUNDS) => {
    const findUseSound = playingDataSound.findIndex(value => value === id)
    const curLanguage = language.name as curLanguage
    return (
      <SoundsTiles
        id={id}
        findUseSound={findUseSound < 0 ? false : true}
        item={sound}
        img={soundDB[Number(id) - 1].img}
        title={soundDB[Number(id) - 1].title[curLanguage]}
        description={soundDB[Number(id) - 1].description[curLanguage]}
        location={soundDB[Number(id) - 1].location}
        storage={soundDB[Number(id) - 1].storage}
        name={soundDB[Number(id) - 1].name}
        booked={soundDB[Number(id) - 1].booked}
        globalCategory={soundDB[Number(id) - 1].globalCategory}
        newSnd={soundDB[Number(id) - 1].new as boolean}
      />
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient>
        {data.length ? (
          <FlatList
            initialScrollIndex={0}
            ref={flatlistRef}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={dataApp.FLATLIST.numberColumns}
            style={styles.screen}
            onFocus={scroll}
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.id.toString()}
            getItemLayout={(_, index) => ({
              length: 150,
              offset: 150 * index,
              index,
            })}
            ListHeaderComponent={<View style={{ height: 20 }}></View>}
            ListFooterComponent={<View style={{ height: 70 }}></View>}
          />
        ) : (
          <View style={styles.viewEmpty}>
            <TextTitle
              type="title_14"
              style={{ color: theme.TEXT_COLOR, opacity: 0.9 }}>
              {language.Messages.emptyBookedList}
            </TextTitle>
          </View>
        )}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  screen: {
    width: '100%',
    height: '100%',
  },
  viewEmpty: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
})
