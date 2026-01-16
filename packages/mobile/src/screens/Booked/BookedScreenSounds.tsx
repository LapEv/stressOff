import React, { useRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Props } from './interfaces'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { ISOUNDS, ISOUNDSDB, ISoundStateItems } from '@/store/interfaces'
import { SoundsTiles } from '../Sounds/SoundTiles'
import { LinearGradient, TextTitle, View } from '@/components'
import { dataApp } from '@/data/dataApp'
import { DATA_SOUNDS } from '@/data/contentApp'
import { useLanguage } from '@/hooks'

export const BookedScreenSounds = ({ route }: Props) => {
  const [{ name, Messages }] = useLanguage()
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const soundDB = useSelector<RootState>(
    state => state.db.sounds,
  ) as ISOUNDSDB[]
  const playingDataSound = (
    useSelector<RootState>(
      state => state.sound.mixedSound,
    ) as ISoundStateItems[]
  ).map(value => (value.id ? value.id : ''))

  const data = soundDB.filter(value => value.booked)

  const flatlistRef = useRef<FlatList | null>(null)
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

  const renderItem = ({ id, _id, sound }: ISOUNDS) => {
    const findUseSound = playingDataSound.findIndex(value => value === id)
    const description = JSON.parse(soundDB[Number(id) - 1].description)[name]
    const title = JSON.parse(soundDB[Number(id) - 1].title)[name]
    const img = DATA_SOUNDS.find(
      item => item.name === soundDB[Number(id) - 1].name,
    )?.img
    return (
      <SoundsTiles
        id={id}
        _id={_id}
        findUseSound={findUseSound < 0 ? false : true}
        item={sound}
        img={img}
        title={title}
        description={description}
        location={soundDB[Number(id) - 1].location}
        storage={soundDB[Number(id) - 1].storage}
        name={soundDB[Number(id) - 1].name}
        booked={soundDB[Number(id) - 1].booked}
        globalCategory={soundDB[Number(id) - 1].globalCategory}
        newSound={soundDB[Number(id) - 1].newSound}
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
              {Messages.emptyBookedList}
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
