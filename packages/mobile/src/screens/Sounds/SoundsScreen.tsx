import React, { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ISOUNDS, ISoundStateItems } from '@/store/interfaces'
import { curLanguage } from '@/localization/language'
import { LinearGradient } from '@/components'
import { dataApp } from '@/data/dataApp'
import { SoundsTiles } from './SoundTiles'
import { Props } from './interfaces'

export const SoundsScreen = ({ route }: Props) => {
  const language = useSelector<RootState>(
    state => state.language.name,
  ) as curLanguage
  const soundDB = useSelector<RootState>(state => state.db.sounds) as ISOUNDS[]
  const playingDataSound = (
    useSelector<RootState>(
      state => state.sound.mixedSound,
    ) as ISoundStateItems[]
  ).map(value => (value.id ? value.id : ''))

  const data = soundDB.filter(value => value.category[language] === route.name)
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

  // console.log('data = ', data)
  // console.log('route.name = ', route.name)
  console.log('soundDB = ', soundDB[1])
  const renderItem = ({ id, sound }: ISOUNDS) => {
    const findUseSound = playingDataSound.findIndex(value => value === id)
    return (
      <SoundsTiles
        id={id}
        findUseSound={findUseSound < 0 ? false : true}
        item={sound}
        img={soundDB[Number(id) - 1].img}
        title={soundDB[Number(id) - 1].title[language]}
        description={soundDB[Number(id) - 1].description[language]}
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
      <LinearGradient style={dataApp.MAIN_BACKGROUNDSTYLES}>
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
})
