import React, { useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Props } from './interfaces'
import { RootState } from '@/store'
import { curLanguage } from '@/localization/language'
import { IMUSICS } from '@/store/interfaces'
import { dataApp } from '@/data/dataApp'
import { LinearGradient } from '@/components'
import { MusicTiles } from './MusicTiles'

export const MusicsScreen = ({ route }: Props) => {
  const language = useSelector<RootState>(
    state => state.language.name,
  ) as curLanguage
  const playingMusicId = useSelector<RootState>(state => state.music.id)
  const musicDB = useSelector<RootState>(state => state.db.musics) as IMUSICS[]

  const data = musicDB.filter(
    value =>
      value.category[language as keyof typeof value.category] === route.name,
  )

  const flatlistRef = useRef<FlatList<any> | null>(null)
  const scroll = () => {
    // if (route.params && route.params.scrollToEnd) {
    if (route.params) {
      setTimeout(() => {
        flatlistRef.current?.scrollToEnd({ animated: true })
      }, 1000)
    }
  }

  const renderItem = ({ id }: IMUSICS) => {
    return (
      <MusicTiles
        id={id}
        findUseMusic={playingMusicId === id ? true : false}
        item={musicDB[Number(id) - 1].sound}
        img={musicDB[Number(id) - 1].img}
        title={musicDB[Number(id) - 1].title[language]}
        description={musicDB[Number(id) - 1].description[language]}
        location={musicDB[Number(id) - 1].location}
        storage={musicDB[Number(id) - 1].storage}
        name={musicDB[Number(id) - 1].name}
        booked={musicDB[Number(id) - 1].booked}
        globalCategory={musicDB[Number(id) - 1].globalCategory}
        newSnd={musicDB[Number(id) - 1].new as boolean}
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
          getItemLayout={(data, index) => ({
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
