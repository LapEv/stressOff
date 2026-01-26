import React, { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { IMusicScreenProps } from './interfaces'
import { ISOUNDS } from '@/store/interfaces'
import { dataApp } from '@/data/dataApp'
import { LinearGradient } from '@/components'
import { MusicTiles } from './MusicTiles'
import { useCategoryFilter, useDB, useLanguage, usePlay } from '@/hooks'
import { DATA_MUSIC } from '@/data/contentApp'

export const MusicsScreen = ({ route }: IMusicScreenProps) => {
  const [{ musics }] = useDB()
  const [{ nameLanguage }] = useLanguage()
  const [{ musicPlay }] = usePlay()
  const data = useCategoryFilter({
    data: musics,
    filter: route?.params.category as string,
  })

  const flatlistRef = useRef<FlatList | null>(null)
  const scroll = () => {
    // if (route.params && route.params.scrollToEnd) {
    if (route?.params) {
      setTimeout(() => {
        flatlistRef.current?.scrollToEnd({ animated: true })
      }, 1000)
    }
  }

  const renderItem = ({
    id,
    _id,
    sound,
    title,
    description,
    location,
    storage,
    name,
    booked,
    globalCategory,
    newSound,
  }: ISOUNDS) => {
    const _description = JSON.parse(description)[nameLanguage]
    const _title = JSON.parse(title)[nameLanguage]
    const img = DATA_MUSIC.find(item => item.name === name)?.img
    return (
      <MusicTiles
        id={id}
        _id={_id}
        findUseMusic={musicPlay._id === _id ? true : false}
        item={sound}
        img={img}
        title={_title}
        description={_description}
        location={location}
        storage={storage}
        name={name}
        booked={booked}
        globalCategory={globalCategory}
        newSound={newSound}
      />
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient>
        <FlatList
          initialScrollIndex={0}
          ref={flatlistRef}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={dataApp.FLATLIST.numberColumns}
          style={styles.screen}
          data={data}
          renderItem={({ item }) => renderItem(item)}
          onFocus={scroll}
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
    margin: 5,
  },
  textWrap: {
    padding: 10,
  },
})
