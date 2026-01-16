import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SoundsScreen } from '@/screens'
import { CustomTab } from '@/screens/components'
import { soundCat } from '@/data/contentApp'
import { useDB, useLanguage, useTheme } from '@/hooks'

const SoundsTab = createMaterialTopTabNavigator()

export const SoundsTabNavigation = () => {
  const [{ headerTitle, name }] = useLanguage()
  const [{ soundCategories }] = useDB()
  const [{ nameTheme }] = useTheme()

  const CategoriesScreens = () => {
    return soundCategories.map(({ category, title, _id }) => {
      const imgURI = soundCat.find(({ name }) => name === category)
      const img =
        nameTheme === 'MAIN_THEME'
          ? (imgURI?.imgStorage as ImageSourcePropType)
          : (imgURI?.imgStorage_lt as ImageSourcePropType)
      return (
        <SoundsTab.Screen
          name={category}
          key={_id}
          initialParams={{ category: JSON.parse(title)[name] }}
          component={SoundsScreen}
          options={{
            tabBarShowIcon: true,
            tabBarLabel: JSON.parse(title)[name],
            tabBarIcon: () => (
              <Image source={img} resizeMode="stretch" style={styles.img} />
            ),
            title: JSON.parse(title)[name],
          }}
        />
      )
    })
  }

  return (
    <SoundsTab.Navigator
      initialRouteName={soundCategories[0].category}
      backBehavior="initialRoute"
      tabBar={props => {
        return (
          <CustomTab
            {...props}
            label={headerTitle.library}
            categories={soundCategories}
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
