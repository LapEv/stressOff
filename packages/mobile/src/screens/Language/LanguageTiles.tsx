import React, { useEffect, useState } from 'react'
import { useWindowDimensions, StyleSheet } from 'react-native'
import { ILanguageTiles } from './interfaces'
import { LANGUAGE } from '@/localization/language'
import { dataApp } from '@/data/dataApp'
import { Shadow, Text, Touchable, View } from '@/components'
import { CheckSVG } from '@/assets/icons/SVG'
import * as SecureStore from 'expo-secure-store'
import { useDB, useLanguage, useTheme, useUser } from '@/hooks'
// import { useFavorite } from '@/hooks/favorite/useFavorite'

export const LanguageTiles = ({ title, nameTiles }: ILanguageTiles) => {
  const [{ nameLanguage }, { UpdateLanguage, ChangeLanguage }] = useLanguage()
  const [{ borderColor, ITEM_COLOR }] = useTheme()
  // const [{ currentMix }, { ChangeCurrentMixPlay }] = useFavorite()
  const [{ _id }] = useUser()
  const [{ sounds, musics }] = useDB()
  const width = useWindowDimensions().width
  const [active, setActive] = useState<boolean>(
    nameTiles === nameLanguage ? true : false,
  )

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

  const ChangeNameOfMediaLink = () => {
    // Object.keys(LANGUAGE).find(key => {
    //   if (currentMixLabel === currentMix) {
    //     ChangeCurrentMixPlay({
    //       name: currentMixLabel,
    //       _id: '',
    //     })
    //   }
    // })
  }

  const getCategoriesSounds = (_key: string) => {
    return sounds
      .map(value => value.category[_key as keyof typeof value.category])
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map((value, index) => ({
        ['id']: index + 1,
        ['name']: value,
      }))
  }

  const getCategoriesMusics = (_key: string) => {
    return musics
      .map(value => value.category[_key as keyof typeof value.category])
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map((value, index) => ({
        ['id']: index + 1,
        ['name']: value,
      }))
  }

  const ChangeLanguauge = async () => {
    const categorySounds = getCategoriesSounds(nameLanguage)
    const categoriesMusic = getCategoriesMusics(nameLanguage)
    setActive(true)
    setAsyncStorageValueFor(dataApp.language.key, nameLanguage)
    ChangeNameOfMediaLink()
    ChangeLanguage({
      _name: nameLanguage,
      _categorySounds: categorySounds,
      _categoriesMusic: categoriesMusic,
      _categoryFavorites: LANGUAGE[nameLanguage].categoryFavorites,
    })
    UpdateLanguage({ nameLanguage, _id })
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
