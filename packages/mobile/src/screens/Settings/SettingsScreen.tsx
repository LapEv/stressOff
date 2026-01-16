import React from 'react'
import { StyleSheet, SectionList, useWindowDimensions } from 'react-native'
import { ISettings, ISettingsItemsRender } from './interfaces'
import { CustomHeader } from '../components'
import {
  LinearGradient,
  Shadow,
  TextTitle,
  Touchable,
  View,
  ViewStyle,
} from '@/components'
import { dataApp } from '@/data/dataApp'
import { typeElevation } from '@/components/Shadow/typeElevaion'
import { SettingItems } from './SettingItems'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { useLanguage } from '@/hooks'

export const SettingsScreen = ({ navigation }: ISettings) => {
  const [{ settings, headerTitle, buttons }] = useLanguage()
  const width = useWindowDimensions().width
  const theme = useSelector<RootState>(state => state.theme) as ITheme

  const renderItem = ({ data }: ISettingsItemsRender) => {
    console.log('data = ', data)
    return (
      <SettingItems
        name={data[0].name}
        _key={data[0]._key}
        navigation={navigation}
        settingItemsData={settingItemsData}
      />
    )
  }

  const settingItemsData = [
    {
      id: 1,
      title: settings.titleDecoration,
      data: [
        {
          name: settings.nameTheme,
          value: dataApp.settings.theme.value,
          _key: dataApp.settings.theme._key,
        },
        {
          name: settings.nameLanguage,
          value: dataApp.settings.language.value,
          _key: dataApp.settings.language._key,
        },
      ],
    },
    {
      id: 2,
      title: settings.titleService,
      data: [
        {
          name: settings.nameAllSizesFile,
          value: dataApp.settings.allSizes.value,
          _key: dataApp.settings.allSizes._key,
        },
        {
          name: settings.nameDeleteAllFiles,
          value: dataApp.settings.deleteAllFiles.value,
          _key: dataApp.settings.deleteAllFiles._key,
        },
        {
          name: settings.nameToSupport,
          value: dataApp.settings.toSupport.value,
          _key: dataApp.settings.toSupport._key,
        },
      ],
    },
    {
      id: 3,
      title: settings.titleInformation,
      data: [
        {
          name: settings.nameTermsOfService,
          value: dataApp.settings.termOfService.value,
          _key: dataApp.settings.termOfService._key,
        },
      ],
    },
  ]

  const shadowitems = {
    width: width * 0.9,
    height: 70,
    border: 4,
    style: {
      padding: 20,
      paddingRight: 10,
      margin: 20,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
  }

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} label={headerTitle.settings} />
      <LinearGradient>
        <Touchable
          style={{
            ...styles.touchChange,
            width: width / dataApp.timer.numberColumns,
          }}
          onPress={() =>
            navigation.navigate('LoginScreen', {
              screen: 'LoginScreen',
            })
          }>
          <Shadow style={shadowitems}>
            <TextTitle type="title_16b">{buttons.signIn}</TextTitle>
          </Shadow>
        </Touchable>
        <SectionList
          style={{ width: '100%' }}
          contentContainerStyle={styles.sectionContainer}
          sections={settingItemsData}
          keyExtractor={(item, index) => item._key + index}
          renderItem={({ item }) => renderItem(item)}
          renderSectionHeader={({ section: { title, id } }) => (
            <View style={{ ...styles.header, width: width }}>
              {id > 1 && (
                <ViewStyle
                  style={{
                    ...styles.sectionView,
                    borderColor: theme.CHECK_COLOR,
                  }}
                />
              )}
              <TextTitle type="title_20b" style={styles.headerText}>
                {title}
              </TextTitle>
            </View>
          )}
          ListFooterComponent={<View style={styles.footerView}></View>}
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    paddingTop: 25,
    width: '100%',
    alignSelf: 'stretch',
  },
  touchChange: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionView: {
    width: '100%',
    height: 0.5,
    ...typeElevation,
    borderWidth: 1,
  },
  footerView: {
    width: '100%',
    height: 190,
  },
})
