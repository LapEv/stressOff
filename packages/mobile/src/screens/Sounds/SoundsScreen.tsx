import React, { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ISOUNDSDB, ISoundStateItems } from '@/store/interfaces'
import { LinearGradient } from '@/components'
import { dataApp } from '@/data/dataApp'
import { SoundsTiles } from './SoundTiles'
import { ISoundsScreenProps } from './interfaces'
import { useCategoryFilter, useDB, useLanguage } from '@/hooks'
import { DATA_SOUNDS } from '@/data/contentApp'

export const SoundsScreen = ({ route }: ISoundsScreenProps) => {
  const [{ sounds }] = useDB()
  const [{ name }] = useLanguage()

  const playingDataSound = (
    useSelector<RootState>(
      state => state.sound.mixedSound,
    ) as ISoundStateItems[]
  ).map(value => (value.id ? value.id : ''))
  const data = useCategoryFilter({
    data: sounds,
    filter: route?.params.category as string,
  })
  const flatlistRef = useRef<FlatList | null>(null)

  const scroll = () => {
    // if (route.params && route.params.scrollToEnd) {
    if (route?.params) {
      setTimeout(() => {
        flatlistRef.current?.scrollToEnd({ animated: true })
        // route.params?.scrollToEnd = false
      }, 1000)
    }
  }

  const renderItem = ({ id, _id, sound }: ISOUNDSDB) => {
    const findUseSound = playingDataSound.findIndex(value => value === id)
    const description = JSON.parse(sounds[Number(id) - 1].description)[name]
    const title = JSON.parse(sounds[Number(id) - 1].title)[name]
    const img = DATA_SOUNDS.find(
      item => item.name === sounds[Number(id) - 1].name,
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
        location={sounds[Number(id) - 1].location}
        storage={sounds[Number(id) - 1].storage}
        name={sounds[Number(id) - 1].name}
        booked={sounds[Number(id) - 1].booked}
        globalCategory={sounds[Number(id) - 1].globalCategory}
        newSound={sounds[Number(id) - 1].newSound}
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
    flex: 1,
  },
  screen: {
    width: '100%',
    height: '100%',
  },
})
