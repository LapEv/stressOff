import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MusicsScreen } from '@/screens'
import { CustomTab } from '@/screens/components'
import { musicCat } from '@/data/contentApp'
import { useDB, useLanguage, useTheme } from '@/hooks'

const MusicsTab = createMaterialTopTabNavigator()

export const MusicsTabNavigation = () => {
  const [{ headerTitle, nameLanguage }] = useLanguage()
  const [{ musicCategories }] = useDB()
  const [{ nameTheme }] = useTheme()

  const CategoriesScreens = () => {
    return musicCategories.map(({ category, title, _id }) => {
      const imgURI = musicCat.find(({ name }) => name === category)
      const img =
        nameTheme === 'MAIN_THEME'
          ? (imgURI?.imgStorage as ImageSourcePropType)
          : (imgURI?.imgStorage_lt as ImageSourcePropType)
      return (
        <MusicsTab.Screen
          name={category}
          key={_id}
          initialParams={{ category: JSON.parse(title)[nameLanguage] }}
          component={MusicsScreen}
          options={{
            tabBarShowIcon: true,
            tabBarLabel: JSON.parse(title)[nameLanguage],
            tabBarIcon: () => (
              <Image source={img} resizeMode="stretch" style={styles.img} />
            ),
            title: JSON.parse(title)[nameLanguage],
          }}
        />
      )
    })
  }

  return (
    <MusicsTab.Navigator
      initialRouteName={musicCategories[0].category}
      backBehavior="initialRoute"
      tabBar={props => {
        return (
          <CustomTab
            {...props}
            label={headerTitle.library}
            categories={musicCategories}
          />
        )
      }}>
      {(() => CategoriesScreens())()}
    </MusicsTab.Navigator>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 35,
  },
})
