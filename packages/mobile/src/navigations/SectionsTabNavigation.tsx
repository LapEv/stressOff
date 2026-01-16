import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CustomBottomTab } from '@/screens/components'
import {
  HeartSVGforSection,
  MusicSVG,
  SettingsSVG,
  SoundSVG,
} from '@/assets/icons/SVG'
import { View } from '@/components'
import { SoundsTabNavigation } from './SoundsTabNavigation'
import { SettingsScreen } from '@/screens'
import { MusicsTabNavigation } from './MusicsTabNavigation'
import { FavouritesTabNavigation } from './FavouritesTabNavigation'
import { useLanguage, useTheme } from '@/hooks'

const SectionsTab = createBottomTabNavigator()

export const SectionsTabNavigation = () => {
  const [{ headerTitle, section }] = useLanguage()
  const [{ ITEM_COLOR }] = useTheme()

  return (
    <SectionsTab.Navigator
      initialRouteName="SoundsTabNavigation"
      backBehavior="initialRoute"
      tabBar={props => {
        return <CustomBottomTab {...props} label={headerTitle.library} />
      }}>
      <SectionsTab.Screen
        name="FavouritesTabNavigation"
        component={FavouritesTabNavigation}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: section.favoriteMix,
          tabBarIcon: () => (
            <View style={styles.view25}>
              <HeartSVGforSection
                width="100%"
                height="100%"
                fill={ITEM_COLOR}
              />
            </View>
          ),
          headerShown: false,
        }}
      />
      <SectionsTab.Screen
        name="SoundsTabNavigation"
        component={SoundsTabNavigation}
        options={{
          tabBarLabel: section.sounds,
          tabBarIcon: () => (
            <View style={styles.view30}>
              <SoundSVG width="100%" height="100%" fill={ITEM_COLOR} />
            </View>
          ),

          headerShown: false,
        }}
      />
      <SectionsTab.Screen
        name="MusicsTabNavigation"
        component={MusicsTabNavigation}
        options={{
          tabBarLabel: section.musics,
          tabBarIcon: () => (
            <View style={styles.view30}>
              <MusicSVG width="100%" height="100%" fill={ITEM_COLOR} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <SectionsTab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: section.settings,
          tabBarIcon: () => (
            <View style={styles.view25}>
              <SettingsSVG width="100%" height="100%" fill={ITEM_COLOR} />
            </View>
          ),
          headerShown: false,
        }}
      />
    </SectionsTab.Navigator>
  )
}

const styles = StyleSheet.create({
  view25: {
    width: 25,
    height: 25,
  },
  view30: {
    width: 30,
    height: 30,
  },
})
