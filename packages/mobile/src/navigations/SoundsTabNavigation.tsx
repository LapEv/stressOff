import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ISOUNDCategories } from '@/store/interfaces'
import { ITheme } from '@/theme/interfaces'
import { curLanguage } from '@/localization/language'
import { IHeaderTitle } from '@/localization/interfaces'
import { SoundsScreen } from '@/screens'
import { CustomTab } from '@/screens/components'
import { soundCat } from '@/data/contentApp'
import { RootStackParamList } from './interfaces'

const SoundsTab = createMaterialTopTabNavigator()

export type SoundsTabScreenProps<T extends keyof RootStackParamList> =
  MaterialTopTabScreenProps<RootStackParamList, T>

export const SoundsTabNavigation = () => {
  const headerTitle = useSelector<RootState>(
    state => state.language.headerTitle,
  ) as IHeaderTitle
  const language = useSelector<RootState>(
    state => state.language.name,
  ) as curLanguage
  const categories = useSelector<RootState>(
    state => state.db.soundCategories,
  ) as ISOUNDCategories[]
  const theme = useSelector<RootState>(state => state.theme) as ITheme

  const CategoriesScreens = () => {
    return categories.map(({ category, title, id }) => {
      const imgURI = soundCat.find(({ name }) => name === category)
      const img =
        theme.name === 'MAIN_THEME'
          ? (imgURI?.imgStorage as ImageSourcePropType)
          : (imgURI?.imgStorage_lt as ImageSourcePropType)
      return (
        <SoundsTab.Screen
          name={title[language]}
          key={id}
          component={SoundsScreen}
          options={{
            tabBarShowIcon: true,
            tabBarLabel: title[language],
            tabBarIcon: () => (
              <Image source={img} resizeMode="stretch" style={styles.img} />
            ),
            title: title[language],
          }}
        />
      )
    })
  }

  return (
    <SoundsTab.Navigator
      // initialRouteName="SoundsScreen"
      // backBehavior="initialRoute"
      tabBar={props => {
        return (
          <CustomTab
            {...props}
            label={headerTitle.library}
            categories={categories}
          />
        )
      }}>
      {(() => CategoriesScreens())()}
    </SoundsTab.Navigator>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 35,
  },
})
