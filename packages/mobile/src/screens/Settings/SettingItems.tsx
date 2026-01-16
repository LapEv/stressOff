import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Switch, useWindowDimensions } from 'react-native'
import { ISettingsItems } from './interfaces'
import Theme from '@/theme/Theme'
import { RootState } from '@/store'
import { IUser } from '@/store/interfaces'
import { ChangeTheme } from '@/store/actions/theme'
import { FileSizeToString, MusicsSizes, SoundSizes } from '@/functions'
import { modalShowMessage } from '@/store/actions/modalMessage'
import { modalShow } from '@/store/actions/modal'
import { Shadow, Text, Touchable, View } from '@/components'
import { ArrowRightSVG } from '@/assets/icons/SVG'
import { useLanguage, useTheme } from '@/hooks'

export const SettingItems = ({
  name,
  _key,
  navigation,
  settingItemsData,
}: ISettingsItems) => {
  const [{ modalMessages }] = useLanguage()
  const [theme, { UpdateTheme }] = useTheme()
  const user = useSelector<RootState>(state => state.user) as IUser
  const width = useWindowDimensions().width
  const [isEnabled, setIsEnabled] = useState<boolean>(
    theme.name !== Theme.dark.name ? true : false,
  )

  const dispatch = useDispatch()

  const toggleSwitch = () => {
    _key === 'Theme' ? changeThemeHandler() : null
    setIsEnabled(previousState => !previousState)
  }

  const changeThemeHandler = async () => {
    const newTheme = isEnabled ? Theme.dark : Theme.light
    if (theme.name !== newTheme.name) {
      dispatch(ChangeTheme(newTheme.name))
      UpdateTheme({ newTheme, _id: user._id })
    }
  }

  const Press = () => {
    if (_key === settingItemsData[0].data[1]._key) {
      navigation.navigate('LanguageScreen', { screen: 'LanguageScreen' })
    }
    if (_key === settingItemsData[1].data[0]._key) {
      const soundSize = SoundSizes()
      const musicSize = MusicsSizes()
      const totalSize = soundSize + musicSize
      const soundSizeString = FileSizeToString(soundSize)
      const musicSizeString = FileSizeToString(musicSize)
      const totalSizeString = FileSizeToString(totalSize)
      modalMessages.TotalSize.message = `${modalMessages.TotalSize.message1}${soundSizeString} \n${modalMessages.TotalSize.message2}${musicSizeString} \n\n${modalMessages.TotalSize.message4}${totalSizeString}`
      dispatch(modalShowMessage(modalMessages.TotalSize))
    }
    if (_key === settingItemsData[1].data[1]._key) {
      dispatch(modalShow(modalMessages.deleteAllFromDevice))
    }
    if (_key === settingItemsData[1].data[2]._key) {
      navigation.navigate('FeedBackScreen', { screen: 'FeedBackScreen' })
    }
    if (_key === settingItemsData[2].data[0]._key) console.log('terms')
  }

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
  const shadowitems2 = {
    width: width * 0.9,
    height: 60,
    color: theme.BACKGROUNDCOLOR,
    border: 4,
    radius: 15,
    opacity: 0.7,
    x: 0,
    y: 0,
    style: {
      padding: 20,
      paddingRight: 0,
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
    <Touchable disabled={_key === theme._key ? true : false} onPress={Press}>
      {_key === theme._key ? (
        <Shadow style={shadowitems}>
          <Text type="text_16">{name} </Text>
          <Switch
            trackColor={{
              false: theme.BACKGROUNDCOLOR_HEADER,
              true: theme.CHECK_COLOR,
            }}
            thumbColor={isEnabled ? theme.ITEM_COLOR : theme.ITEM_COLOR}
            ios_backgroundColor={theme.BACKGROUNDCOLOR}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Shadow>
      ) : (
        <Shadow style={shadowitems2}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            <Text type="text_16" style={styles.text}>
              {name}
            </Text>
          </View>
          <Touchable
            style={styles.touch}
            onPress={() =>
              navigation.navigate('PlayerScreen', { screen: 'PlayerScreen' })
            }>
            <ArrowRightSVG width="100%" height="100%" fill={theme.ITEM_COLOR} />
          </Touchable>
        </Shadow>
      )}
    </Touchable>
  )
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 30,
    paddingRight: 15,
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  touch: {
    width: 25,
    height: 25,
  },
})
