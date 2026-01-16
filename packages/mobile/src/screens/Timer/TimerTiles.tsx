import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ITimeTiles } from './interfaces'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { individualStart } from '@/store/actions/individualTimer'
import { Shadow, TextTitle, Touchable } from '@/components'
import { dataApp } from '@/data/dataApp'
import { useLanguage } from '@/hooks'

export const TimerTiles = ({ title, duration }: ITimeTiles) => {
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const [{ timer }] = useLanguage()
  const width = useWindowDimensions().width

  const dispatch = useDispatch()

  const timerStart = (duration: number) => {
    if (title !== timer.individual) {
      const interval = setInterval(() => {
        dispatch({
          type: 'TICK',
          time: Date.now(),
        })
      }, 1000)
      dispatch({
        type: 'TIMER_START',
        offset: Date.now() + duration,
        time: Date.now() + 1000,
        interval,
      })
    } else {
      dispatch(individualStart(true))
    }
  }

  const shadowOpt = {
    width: (width / 2) * 0.8,
    height: 60,
    color: theme.BACKGROUNDCOLOR,
    border: 5,
    style: {
      margin: 20,
      borderRadius: 15,
      borderColor: theme.borderColor,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  return (
    <Touchable
      style={{
        ...styles.container,
        width: width / dataApp.timer.numberColumns,
      }}
      onPress={() => timerStart(duration)}>
      <Shadow style={shadowOpt}>
        <TextTitle type="title_16b">{title}</TextTitle>
      </Shadow>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
