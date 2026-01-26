import React, { useState, useEffect } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { IMediaLink } from './interfaces'
import { Shadow, Text, Touchable, View, ViewStyle } from '@/components'
import { ArrowRightSVG, PauseSVG, PlaySVG } from '@/assets/icons/SVG'
import { useLanguage, usePlay, useTheme } from '@/hooks'
import { useFavorite } from '@/hooks/favorite/useFavorite'

export const MediaLink = ({ navigation }: IMediaLink) => {
  const [{ Messages }] = useLanguage()
  const [{ BACKGROUNDCOLOR, ITEM_COLOR, borderColorRGBA }] = useTheme()
  const [{ currentMix }] = useFavorite()
  const [{ playAll, soundsPlay, musicPlay }, { ToggleAllSound }] = usePlay()
  const [play, setPlay] = useState(false)
  const width = useWindowDimensions().width

  useEffect(() => {
    !playAll ? setPlay(false) : setPlay(true)
  }, [playAll])

  const setStatusPlay = () => {
    ToggleAllSound({ playAll: !play })
    setPlay(previousState => !previousState)
  }

  const quantity = soundsPlay.mixedSound.length + (musicPlay._id ? 1 : 0)
  const quantityMessage = `${Messages.element}: ${quantity}`

  return (
    <ViewStyle type="tiles" style={{ ...styles.container }}>
      <Shadow style={{ width: width * 0.95, backgroundColor: BACKGROUNDCOLOR }}>
        <ViewStyle
          style={{
            ...styles.screen,
            borderColor: borderColorRGBA,
            backgroundColor: BACKGROUNDCOLOR,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Touchable
              style={styles.touchRight}
              onPress={() =>
                navigation.navigate('PlayerScreen', { screen: 'PlayerScreen' })
              }>
              <ArrowRightSVG width="100%" height="100%" fill={ITEM_COLOR} />
            </Touchable>
          </View>
          <Touchable
            style={styles.touchCurrentMix}
            onPress={() =>
              navigation.navigate('PlayerScreen', { screen: 'PlayerScreen' })
            }>
            <Text type="text_14" numberOfLines={1}>
              {currentMix}
            </Text>
            <Text type="text_14">{quantityMessage}</Text>
          </Touchable>
          <Touchable style={styles.touchPlay} onPress={() => setStatusPlay()}>
            {!play || quantity === 0 ? (
              <View style={styles.viewPlay}>
                <PlaySVG width="100%" height="100%" fill={ITEM_COLOR} />
              </View>
            ) : (
              <View style={styles.viewPause}>
                <PauseSVG width="100%" height="100%" fill={ITEM_COLOR} />
              </View>
            )}
          </Touchable>
        </ViewStyle>
      </Shadow>
    </ViewStyle>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    width: '99.5%',
    height: 60,
    borderStyle: 'solid',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingRight: 20,
  },
  touchRight: {
    width: 30,
    height: 30,
  },
  touchCurrentMix: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchPlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPlay: {
    width: 30,
    height: 30,
  },
  viewPause: {
    width: 30,
    height: 30,
  },
})
