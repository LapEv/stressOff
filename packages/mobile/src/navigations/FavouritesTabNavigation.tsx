import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { CustomTab } from '@/screens/components'
import { BookedScreenMusics, BookedScreenSounds, MixesScreen } from '@/screens'
import { useLanguage, useTheme } from '@/hooks'

const FavouritesTab = createMaterialTopTabNavigator()

export const FavouritesTabNavigation = () => {
  const [{ headerTitle, categoryFavorites }] = useLanguage()
  const [{ nameTheme }] = useTheme()

  const arrIcons = nameTheme === 'MAIN_THEME' ? favoritesCat : favoritesCat

  return (
    <FavouritesTab.Navigator
      initialRouteName="MixesScreen"
      backBehavior="initialRoute"
      tabBar={props => {
        return (
          <CustomTab
            {...props}
            label={headerTitle.library}
            categories={categoryFavorites}
          />
        )
      }}>
      <FavouritesTab.Screen
        name="MixesScreen"
        component={MixesScreen}
        options={{
          tabBarLabel: categoryFavorites[0].name,
          tabBarIcon: () => (
            <ImageBackground
              source={arrIcons[0]}
              resizeMode="stretch"
              style={styles.imgBack}
            />
          ),
          title: categoryFavorites[0].name,
        }}
      />
      <FavouritesTab.Screen
        name="BookedScreenSounds"
        component={BookedScreenSounds}
        options={{
          tabBarLabel: categoryFavorites[1].name,
          tabBarIcon: () => (
            <ImageBackground
              source={arrIcons[1]}
              resizeMode="stretch"
              style={styles.imgBack}
            />
          ),
          title: categoryFavorites[1].name,
        }}
      />
      <FavouritesTab.Screen
        name="BookedScreenMusics"
        component={BookedScreenMusics}
        options={{
          tabBarLabel: categoryFavorites[2].name,
          tabBarIcon: () => (
            <ImageBackground
              source={arrIcons[2]}
              resizeMode="stretch"
              style={styles.imgBack}
            />
          ),
          title: categoryFavorites[2].name,
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
