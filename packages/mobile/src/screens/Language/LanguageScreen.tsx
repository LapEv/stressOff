import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { ILanguage, ILanguageData } from './interfaces'
import { View } from '@/components'
import { CustomHeader } from '../components'
import { LinearGradient } from 'react-native-svg'
import { dataApp } from '@/data/dataApp'
import { LanguageTiles } from './LanguageTiles'
import { useLanguage } from '@/hooks'

export const LanguageScreen = ({ navigation }: ILanguage) => {
  const [{ headerTitle }] = useLanguage()

  const renderItem = ({ title, value }: ILanguageData) => {
    return <LanguageTiles title={title} nameTiles={value} />
  }

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} label={headerTitle.language} />
      <LinearGradient>
        <View></View>
        <FlatList
          horizontal={false}
          contentContainerStyle={styles.screen}
          data={dataApp.language.data}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={<View style={styles.viewFooter}></View>}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  viewFooter: {
    width: '100%',
    height: 150,
  },
})
