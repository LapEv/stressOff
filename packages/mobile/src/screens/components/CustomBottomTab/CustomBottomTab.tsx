import React, { useRef } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { CustomBottomItem } from './CustomBottomItem'
import { View } from '@/components'
import { dataTab } from '@/navigations/data'
import { ICustomBottomProps, ICustomBottomTabData } from './interfaces'

export const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: ICustomBottomProps) => {
  const myList = useRef<FlatList | null>(null)

  const renderItem = ({ id, keys }: ICustomBottomTabData) => {
    const value = state.routes[id - 1]
    const options = descriptors[state.routes[id - 1].key].options
    return (
      <CustomBottomItem
        keys={keys}
        state={state}
        navigation={navigation}
        id={id}
        value={value}
        options={options}
        myList={myList}
      />
    )
  }

  return (
    <View style={styles.viewContainer}>
      <FlatList
        horizontal={true}
        ref={myList}
        initialScrollIndex={0}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500))
          wait.then(() => {
            myList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            })
          })
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        data={dataTab}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 40,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})
