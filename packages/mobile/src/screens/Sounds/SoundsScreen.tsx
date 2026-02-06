import React, { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ISOUNDS } from '@/store/interfaces'
import { LinearGradient } from '@/components'
import { dataApp } from '@/data/dataApp'
import { SoundsTiles } from './SoundTiles'
import { ISoundsScreenProps } from './interfaces'
import { useCategoryFilter, useDB, useLanguage, usePlay } from '@/hooks'
import { DATA_SOUNDS } from '@/data/contentApp'

export const SoundsScreen = ({ route }: ISoundsScreenProps) => {
  const [{ sounds }] = useDB()
  const [{ nameLanguage }] = useLanguage()
  const [play] = usePlay()
  const flatlistRef = useRef<FlatList | null>(null)
  const data = useCategoryFilter({
    data: sounds,
    filter: route?.params.category as string,
  })

  const scroll = () => {
    if (route?.params && route.params.scrollToEnd) {
      // if (route?.params) {
      setTimeout(() => {
        flatlistRef.current?.scrollToEnd({ animated: true })
        // route.params.scrollToEnd = false
        // Object.defineProperty(route.params, 'scrollToEnd', false)
      }, 1000)
    }
  }

  const renderItem = ({
    id,
    _id,
    title,
    description,
    location,
    storage,
    name,
    booked,
    globalCategory,
    newSound,
    img,
  }: ISOUNDS) => {
    const findUseSound = play.soundsPlay.mixedSound.findIndex(
      value => value._id === _id,
    )
    const _description = JSON.parse(description)[nameLanguage]
    const data = DATA_SOUNDS.find(item => item.name === name)
    // const img = data?.img
    const _sound = data?.sound
    return (
      <SoundsTiles
        id={id}
        _id={_id}
        findUseSound={findUseSound < 0 ? false : true}
        item={_sound}
        img={img}
        title={JSON.parse(title)}
        description={_description}
        location={location}
        storage={storage}
        name={name}
        booked={JSON.parse(booked)}
        globalCategory={globalCategory}
        newSound={JSON.parse(newSound)}
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
          keyExtractor={item => item._id}
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
