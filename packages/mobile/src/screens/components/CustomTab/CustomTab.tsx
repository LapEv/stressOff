import React, { useRef } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { ICustomTab } from './interfaces'
import { RootState } from '@/store'
import { ICategoryFavorites } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import { ISOUNDCategories } from '@/store/interfaces'
import { CustomTabItem } from './CustomTabItem'
import { CustomHeader } from '../CustomHeader/CustomHeader'
import { MediaLink } from '../MediaLink/MediaLink'
import { NavigationPropSound } from '@/navigations/interfaces'

export const CustomTab = ({
  state,
  descriptors,
  navigation,
  label,
  categories,
}: ICustomTab) => {
  const categoryFavorites = useSelector<RootState>(
    state => state.language.categoryFavorites,
  ) as ICategoryFavorites[]
  const theme = useSelector<RootState>(state => state.theme) as ITheme

  const findMixesScreen = function (
    categories: ISOUNDCategories[],
    categoryFavorites: ICategoryFavorites[],
  ) {
    return categories.filter(function (n: any) {
      return categoryFavorites.indexOf(n) !== -1
    })
  }
  const mixesScreen = findMixesScreen(categories, categoryFavorites)

  const myList = useRef<FlatList<any> | null>(null)

  const renderItem = ({ id }: ISOUNDCategories) => {
    const value = state.routes[Number(id) - 1]
    const key = value.key
    const options = descriptors[key as keyof typeof descriptors].options
    return (
      <CustomTabItem
        value={value}
        options={options}
        id={Number(id)}
        myList={myList}
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
    )
  }

  return (
    <View>
      <CustomHeader
        navigation={navigation as NavigationPropSound}
        label={label}
      />
      <MediaLink navigation={navigation as NavigationPropSound} />

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
        style={{
          ...styles.flat,
          backgroundColor: theme.BACKGROUNDCOLOR_HEADER,
        }}
        contentContainerStyle={[
          mixesScreen.length ? { flex: 1 } : null,
          styles.flatContainer,
        ]}
        data={categories}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flat: {
    flexDirection: 'row',
    height: 100,
    elevation: 15,
    zIndex: 9,
  },
  flatContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
