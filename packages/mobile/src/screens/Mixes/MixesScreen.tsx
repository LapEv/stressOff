import {
  LinearGradient,
  Shadow,
  TextTitle,
  Touchable,
  View,
} from '@/components'
import React, { useEffect } from 'react'
import { StyleSheet, FlatList, useWindowDimensions } from 'react-native'
import { FavoritesTiles } from '../Favorites/FavoritesTiles'
import { useFavorite, useLanguage, useModal } from '@/hooks'

export const MixesScreen = () => {
  const [{ modalMessages, buttons, Messages }] = useLanguage()
  const [, { showModal }] = useModal()
  const [{ favorites, currentMix }] = useFavorite()
  const width = useWindowDimensions().width

  useEffect(() => {}, [favorites])

  const ClearMixesList = () => {
    showModal(modalMessages.removeFavoriteAllMix)
  }

  const renderItem = ({ item }) => (
    <FavoritesTiles item={item} use={item.name === currentMix} />
  )

  const shadow = {
    width: width * 0.5,
    height: 52,
    radius: 10,
    marginTop: 15,
    style: {
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      opacity: 1,
    },
  }

  return (
    <View style={styles.container}>
      <LinearGradient style={{ height: '100%' }}>
        <View style={styles.screen}>
          {favorites.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.flatContainer}
              horizontal={false}
              style={styles.flat}
              data={favorites}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <View style={styles.viewClear}>
                  <Shadow style={shadow}>
                    <Touchable
                      style={styles.touchClear}
                      onPress={ClearMixesList}>
                      <TextTitle type="title_20b">{buttons.clear}</TextTitle>
                    </Touchable>
                  </Shadow>
                </View>
              }
            />
          ) : (
            <View style={styles.viewEmptyOwn}>
              <TextTitle type="title_14" style={{ opacity: 0.9 }}>
                {Messages.emptyOwnMixes}
              </TextTitle>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMessages: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'open-regular',
    opacity: 0.9,
  },
  flatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flat: { width: '100%', height: '100%' },
  viewClear: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  touchClear: {
    width: '99.5%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewEmptyOwn: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
})
