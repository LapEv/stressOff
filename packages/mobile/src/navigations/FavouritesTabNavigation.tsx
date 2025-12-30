import React from 'react'
import { ImageBackground, ImageSourcePropType, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IHeaderTitle } from '@/localization/interfaces'
import { ITheme } from '@/theme/interfaces'
import { CustomTab } from '@/screens/components'
import { ISOUNDCategories } from '@/store/interfaces'
import { BookedScreenMusics, BookedScreenSounds, MixesScreen } from '@/screens'

const FavouritesTab = createMaterialTopTabNavigator()

export const FavouritesTabNavigation = () => {
  const favoritesCat = useSelector<RootState>(
    state => state.language.favoritesCat,
  ) as ImageSourcePropType[]
  const headerTitle = useSelector<RootState>(
    state => state.language.headerTitle,
  ) as IHeaderTitle

  const categories = useSelector<RootState>(
    state => state.language.categoryFavorites,
  ) as ISOUNDCategories[]
  const theme = useSelector<RootState>(state => state.theme) as ITheme

  const arrIcons = theme.name === 'MAIN_THEME' ? favoritesCat : favoritesCat

  return (
    <FavouritesTab.Navigator
      initialRouteName="MixesScreen"
      backBehavior="initialRoute"
      tabBar={props => {
        return (
          <CustomTab
            {...props}
            label={headerTitle.library}
            categories={categories}
          />
        )
      }}>
      <FavouritesTab.Screen
        name="MixesScreen"
        component={MixesScreen}
        options={{
          tabBarLabel: categories[0].name,
          tabBarIcon: () => (
            <ImageBackground
              source={arrIcons[0]}
              resizeMode="stretch"
              style={styles.imgBack}
            />
          ),
          title: categories[0].name,
        }}
      />
      <FavouritesTab.Screen
        name="BookedScreenSounds"
        component={BookedScreenSounds}
        options={{
          tabBarLabel: categories[1].name,
          tabBarIcon: () => (
            <ImageBackground
              source={arrIcons[1]}
              resizeMode="stretch"
              style={styles.imgBack}
            />
          ),
          title: categories[1].name,
        }}
      />
      <FavouritesTab.Screen
        name="BookedScreenMusics"
        component={BookedScreenMusics}
        options={{
          tabBarLabel: categories[2].name,
          tabBarIcon: () => (
            <ImageBackground
              source={arrIcons[2]}
              resizeMode="stretch"
              style={styles.imgBack}
            />
          ),
          title: categories[2].name,
        }}
      />
    </FavouritesTab.Navigator>
  )
}

const styles = StyleSheet.create({
  imgBack: {
    width: 45,
    height: 35,
  },
})
