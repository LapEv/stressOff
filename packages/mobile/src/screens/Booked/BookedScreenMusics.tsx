import React, { useRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Props } from './interfaces'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import { IMUSICS } from '@/store/interfaces'
import { MusicTiles } from '../Music/MusicTiles'
import { curLanguage } from '@/localization/language'
import { LinearGradient, TextTitle, View } from '@/components'
import { dataApp } from '@/data/dataApp'

export const BookedScreenMusics = ({ route }: Props) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const playingMusicId = useSelector<RootState>(
    state => state.music.id,
  ) as number
  const musicDB = useSelector<RootState>(state => state.db.musics) as IMUSICS[]

  const data = musicDB.filter(value => value.booked)

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

  const renderItem = ({ id }: IMUSICS) => {
    const curLanguage = language.name as curLanguage
    return (
      <MusicTiles
        id={id}
        findUseMusic={playingMusicId === Number(id) ? true : false}
        item={musicDB[Number(id) - 1].sound}
        img={musicDB[Number(id) - 1].img}
        title={musicDB[Number(id) - 1].title[curLanguage]}
        description={musicDB[Number(id) - 1].description[curLanguage]}
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
