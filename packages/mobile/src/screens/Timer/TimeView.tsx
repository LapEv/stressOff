import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  useWindowDimensions,
  BackHandler,
  Switch,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ITimeView } from './interfaces'
import { ITimerState } from '@/store/interfaces'
import { RootState } from '@/store'
import { ITheme } from '@/theme/interfaces'
import { checkCloseApp, timerStop } from '@/store/actions/timer'
import {
  Shadow,
  Text,
  TextTitle,
  Touchable,
  View,
  ViewStyle,
} from '@/components'
import { dataApp } from '@/data/dataApp'
import { useLanguage } from '@/hooks'

export const TimeView = ({ screen, on }: ITimeView) => {
  const timer = useSelector<RootState>(state => state.timer) as ITimerState
  const [language] = useLanguage()
  const theme = useSelector<RootState>(state => state.theme) as ITheme
  const width = useWindowDimensions().width
  const [time, setTime] = useState<number>(0)
  const [show, setShow] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(timer.closeApp)

  const format = (time: number, showMsecs: boolean) => {
    const msecs = time % 1000

    const msecsStr = msecs < 10 ? `00${msecs}` : `0${msecs}`

    let seconds = Math.floor(time / 1000)
    let minutes = Math.floor(time / 60000)
    const hours = Math.floor(time / 3600000)
    seconds = seconds - minutes * 60
    minutes = minutes - hours * 60
    let formatted
    if (showMsecs) {
      formatted = `${hours < 10 ? 0 : ''}${hours}:${
        minutes < 10 ? 0 : ''
      }${minutes}:${seconds < 10 ? 0 : ''}${seconds}:${msecsStr}`
    } else {
      formatted = `${hours < 10 ? 0 : ''}${hours}:${
        minutes < 10 ? 0 : ''
      }${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
    }

    return formatted
  }

  useEffect(() => {
    timer.isOn && !on ? StopTimer() : null
  }, [on])

  useEffect(() => {
    setTime(format(timer.time, false))
    setShow(timer.isOn)
    if (timer.time <= 0 && timer.isOn) {
      StopTimer()
      isEnabled || timer.closeApp ? BackHandler.exitApp() : null
    }
  }, [timer])

  const dispatch = useDispatch()
  const StopTimer = () => {
    dispatch(
      timerStop({
        type: 'TIMER_STOP',
      }),
    )
  }

  const shadowOpt = {
    width: (width / 2) * 0.8,
    height: 60,
    border: 5,
    opacity: 0.5,
    borderRadius: 15,
    style: {
      margin: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
  }

  if (screen === 'Player') {
    return (
      show && (
        <View style={styles.viewPlayer}>
          <View style={styles.container}>
            <Text type="text_12">{time}</Text>
          </View>
        </View>
      )
    )
  }

  if (screen !== 'Player') {
    return (
      show && (
        <View style={styles.viewAnother}>
          <ViewStyle style={styles.container2}>
            <Text type="text_12" style={styles.text2}>
              {time}
            </Text>
          </ViewStyle>
          <View style={{ ...styles.item, width: width }}>
            <Text type="text_14">{language.timer.timerExitApp}</Text>
            <Switch
              trackColor={{
                false: theme.BACKGROUNDCOLOR,
                true: theme.CHECK_COLOR,
              }}
              thumbColor={isEnabled ? theme.ITEM_COLOR : theme.ITEM_COLOR}
              ios_backgroundColor={theme.BACKGROUNDCOLOR}
              onValueChange={() => (
                setIsEnabled(previousState => !previousState),
                dispatch(checkCloseApp(!isEnabled))
              )}
              value={isEnabled}
            />
          </View>
          <Touchable
            style={{
              ...styles.touch,
              width: width / dataApp.timer.numberColumns,
            }}
            onPress={StopTimer}>
            <Shadow style={shadowOpt}>
              <TextTitle type="title_16b">
                {language.timer.stopTimerTitle}
              </TextTitle>
            </Shadow>
          </Touchable>
        </View>
      )
    )
  }
}

const styles = StyleSheet.create({
  viewPlayer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  viewAnother: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  container: {
    width: 100,
    marginTop: 10,
    alignItems: 'center',
  },
  container2: {
    padding: 15,
    borderRadius: 15,
    width: 200,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  text2: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
