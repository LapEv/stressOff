import React, { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { IMusicScreenProps } from './interfaces'
import { RootState } from '@/store'
import { IMUSICSDB } from '@/store/interfaces'
import { dataApp } from '@/data/dataApp'
import { LinearGradient } from '@/components'
import { MusicTiles } from './MusicTiles'
import { useCategoryFilter, useDB, useLanguage } from '@/hooks'
import { DATA_MUSIC } from '@/data/contentApp'

export const MusicsScreen = ({ route }: IMusicScreenProps) => {
  const [{ musics }] = useDB()
  const [{ name }] = useLanguage()
  const playingMusicId = useSelector<RootState>(state => state.music.id)
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

  const renderItem = ({ id, _id }: IMUSICSDB) => {
    const description = JSON.parse(musics[Number(id) - 1].description)[name]
    const title = JSON.parse(musics[Number(id) - 1].title)[name]
    const img = DATA_MUSIC.find(
      item => item.name === musics[Number(id) - 1].name,
    )?.img
    return (
      <MusicTiles
        id={id}
        _id={_id}
        findUseMusic={playingMusicId === id ? true : false}
        item={musics[Number(id) - 1].sound}
        img={img}
        title={title}
        description={description}
        location={musics[Number(id) - 1].location}
        storage={musics[Number(id) - 1].storage}
        name={musics[Number(id) - 1].name}
        booked={musics[Number(id) - 1].booked}
        globalCategory={musics[Number(id) - 1].globalCategory}
        newSound={musics[Number(id) - 1].newSound}
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
