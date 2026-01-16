import { RootState } from '@/store'
import { IMUSICSDB, ISOUNDSDB, IUser } from '@/store/interfaces'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ILanguageTiles } from './interfaces'
import { LANGUAGE } from '@/localization/language'
import { ChangeCurrentMixPlay } from '@/store/actions/favorites'
import { dataApp } from '@/data/dataApp'
import { ChangeLanguage } from '@/store/actions/language'
import { Shadow, Text, Touchable, View } from '@/components'
import { CheckSVG } from '@/assets/icons/SVG'
import * as SecureStore from 'expo-secure-store'
import { useLanguage, useTheme } from '@/hooks'

export const LanguageTiles = ({ title, nameTiles }: ILanguageTiles) => {
  const [{ name }, { UpdateLanguage }] = useLanguage()
  const [{ borderColor, ITEM_COLOR }] = useTheme()
  const user = useSelector<RootState>(state => state.user) as IUser
  const width = useWindowDimensions().width
  const [active, setActive] = useState<boolean>(
    nameTiles === name ? true : false,
  )
  const currentMix = useSelector<RootState>(
    state => state.favorites.currentMix,
  ) as string
  const soundDB = useSelector<RootState>(
    state => state.db.sounds,
  ) as ISOUNDSDB[]
  const musicDB = useSelector<RootState>(
    state => state.db.musics,
  ) as IMUSICSDB[]

  const dispatch = useDispatch()

  const shadowOpt = {
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
      borderColor: borderColor,
      borderWidth: 1,
    },
  }

  useEffect(() => {
    name !== name && active ? setActive(false) : null
  }, [name])

  function setAsyncStorageValueFor(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, JSON.stringify(value))
    } catch (e) {
      console.log('SettingsItems: Error: ', e)
    }
  }

  const ChangeNameOfMediaLink = (name: string) => {
    Object.keys(LANGUAGE).find(key => {
      if (LANGUAGE[key as keyof typeof LANGUAGE].currentMix === currentMix) {
        dispatch(
          ChangeCurrentMixPlay({
            name: LANGUAGE[name as keyof typeof LANGUAGE].currentMix,
          }),
        )
      }
    })
  }

  const getCategoriesSounds = (_key: string) => {
    return soundDB
      .map(value => value.category[_key as keyof typeof value.category])
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map((value, index) => ({
        ['id']: index + 1,
        ['name']: value,
      }))
  }

  const getCategoriesMusics = (_key: string) => {
    return musicDB
      .map(value => value.category[_key as keyof typeof value.category])
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map((value, index) => ({
        ['id']: index + 1,
        ['name']: value,
      }))
  }

  const ChangeLanguauge = async () => {
    const categorySounds = getCategoriesSounds(name)
    const categoriesMusic = getCategoriesMusics(name)
    setActive(true)
    setAsyncStorageValueFor(dataApp.language.key, name)
    ChangeNameOfMediaLink(name)
    dispatch(
      ChangeLanguage({
        _name: name,
        _categorySounds: categorySounds,
        _categoriesMusic: categoriesMusic,
        _categoryFavorites: LANGUAGE[name].categoryFavorites,
      }),
    )
    UpdateLanguage({ name, _id: user._id })
  }

  return (
    <Touchable onPress={() => ChangeLanguauge()} disabled={active}>
      <Shadow style={shadowOpt}>
        <Text type="text_16">{title}</Text>
        {active ? (
          <View style={styles.view}>
            <CheckSVG
              width={active ? '70%' : '0'}
              height={active ? '70%' : '0'}
              fill={ITEM_COLOR}
            />
          </View>
        ) : null}
      </Shadow>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '50%',
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})
