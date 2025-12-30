import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { ILanguage, ILanguageData } from './interfaces'
import { View } from '@/components'
import { CustomHeader } from '../components'
import { LinearGradient } from 'react-native-svg'
import { dataApp } from '@/data/dataApp'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { LanguageTiles } from './LanguageTiles'

export const LanguageScreen = ({ navigation }: ILanguage) => {
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions

  const renderItem = ({ title, value }: ILanguageData) => {
    return <LanguageTiles title={title} name={value} />
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        navigation={navigation}
        label={language.headerTitle.language}
      />
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
