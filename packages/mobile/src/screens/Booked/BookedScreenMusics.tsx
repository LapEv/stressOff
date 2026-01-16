import React, { useRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Props } from './interfaces'
import { RootState } from '@/store'
import { IMUSICSDB } from '@/store/interfaces'
import { MusicTiles } from '../Music/MusicTiles'
import { LinearGradient, TextTitle, View } from '@/components'
import { dataApp } from '@/data/dataApp'
import { DATA_MUSIC } from '@/data/contentApp'
import { useLanguage, useTheme } from '@/hooks'

export const BookedScreenMusics = ({ route }: Props) => {
  const [{ name, Messages }] = useLanguage()
  const [{ TEXT_COLOR }] = useTheme()
  const playingMusicId = useSelector<RootState>(
    state => state.music.id,
  ) as number
  const musicDB = useSelector<RootState>(
    state => state.db.musics,
  ) as IMUSICSDB[]

  const data = musicDB.filter(value => value.booked)

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

  const renderItem = ({ id, _id }: IMUSICSDB) => {
    const curLanguage = name
    const description = JSON.parse(musicDB[Number(id) - 1].description)[
      curLanguage
    ]
    const title = JSON.parse(musicDB[Number(id) - 1].title)[curLanguage]
    const img = DATA_MUSIC.find(
      item => item.name === musicDB[Number(id) - 1].name,
    )?.img

    return (
      <MusicTiles
        id={id}
        _id={_id}
        findUseMusic={playingMusicId === Number(id) ? true : false}
        item={musicDB[Number(id) - 1].sound}
        img={img}
        title={title}
        description={description}
        location={musicDB[Number(id) - 1].location}
        storage={musicDB[Number(id) - 1].storage}
        name={musicDB[Number(id) - 1].name}
        booked={musicDB[Number(id) - 1].booked}
        globalCategory={musicDB[Number(id) - 1].globalCategory}
        newSound={musicDB[Number(id) - 1].newSound}
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
              style={{ color: TEXT_COLOR, opacity: 0.9 }}>
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
