import React, { useRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Props } from './interfaces'
import { ISOUNDS } from '@/store/interfaces'
import { SoundsTiles } from '../Sounds/SoundTiles'
import { LinearGradient, TextTitle, View } from '@/components'
import { dataApp } from '@/data/dataApp'
import { DATA_SOUNDS } from '@/data/contentApp'
import { useDB, useLanguage, usePlay, useTheme } from '@/hooks'

export const BookedScreenSounds = ({ route }: Props) => {
  const [{ nameLanguage, Messages }] = useLanguage()
  const [{ sounds }] = useDB()
  const [play] = usePlay()
  const [{ TEXT_COLOR }] = useTheme()
  const data = sounds.filter(value => value.booked)

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
    const findUseSound = play.soundsPlay.mixedSound.findIndex(
      value => value._id === _id,
    )
    const _description = JSON.parse(description)[nameLanguage]
    const _title = JSON.parse(title)[nameLanguage]
    const img = DATA_SOUNDS.find(item => item.name === name)?.img
    return (
      <SoundsTiles
        id={id}
        _id={_id}
        findUseSound={findUseSound < 0 ? false : true}
        item={sound}
        img={img}
        title={_title}
        description={_description}
        location={location}
        storage={storage}
        name={name}
        booked={JSON.parse(booked)}
        globalCategory={globalCategory}
        newSound={newSound}
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
