import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { IMUSICCategories } from '@/store/interfaces'
import { ITheme } from '@/theme/interfaces'
import { MusicsScreen } from '@/screens'
import { IHeaderTitle } from '@/localization/interfaces'
import { CustomTab } from '@/screens/components'

const MusicsTab = createMaterialTopTabNavigator()

export const MusicsTabNavigation = () => {
  const headerTitle = useSelector<RootState>(
    state => state.language.headerTitle,
  ) as IHeaderTitle
  const language = useSelector<RootState>(
    state => state.language.name,
  ) as string
  const categories = useSelector<RootState>(
    state => state.db.musicCategories,
  ) as IMUSICCategories[]
  const theme = useSelector<RootState>(state => state.theme) as ITheme

  function CategoriesScreens() {
    return categories.map(({ title, img, img_lt, id }) => {
      return (
        <MusicsTab.Screen
          name={title[language as keyof typeof title]}
          key={id}
          component={MusicsScreen}
          options={{
            tabBarLabel: title[language as keyof typeof title],
            tabBarIcon: () => (
              <ImageBackground
                source={
                  theme.name === 'MAIN_THEME' ? { uri: img } : { uri: img_lt }
                }
                resizeMode="stretch"
                style={styles.imgBack}
              />
            ),
            title: title[language as keyof typeof title],
          }}
        />
      )
    })
  }

  return (
    <MusicsTab.Navigator
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
    </MusicsTab.Navigator>
  )
}

const styles = StyleSheet.create({
  imgBack: {
    width: 45,
    height: 35,
  },
})
