import React, { useEffect, useState } from 'react'
import { StyleSheet, Platform, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { individualStart } from '@/store/actions/individualTimer'
import { RootState } from '@/store'
import { ILocalizationOptions } from '@/localization/interfaces'
import { IindividualStart } from '@/store/interfaces'
import { LinearGradient, TextTitle, Touchable, View } from '@/components'
import { typeElevation } from '@/components/Shadow/typeElevaion'

export const TimePicker = () => {
  const [show, setShow] = useState<boolean>(false)
  const [time, setTime] = useState<Date>(new Date('2021-10-22T00:00:00'))
  const language = useSelector<RootState>(
    state => state.language,
  ) as ILocalizationOptions
  const individualTimer = useSelector<RootState>(
    state => state.individualTimer,
  ) as IindividualStart
  const dispatch = useDispatch()

  useEffect(() => {
    individualTimer.individual
      ? (setShow(true), dispatch(individualStart(false)))
      : null
  }, [individualTimer.individual])

  const timerStart = (duration: number) => {
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
  }

  const onChange = (_: DateTimePickerEvent, selectedTime: Date | undefined) => {
    const offsetHours = selectedTime
      ? Math.abs(selectedTime.getTimezoneOffset() / 60)
      : null
    selectedTime
      ? (setShow(Platform.OS === 'ios'),
        timerStart(
          (selectedTime.getHours() - (offsetHours as number)) * 3600000 +
            selectedTime.getMinutes() * 60000,
        ))
      : setShow(Platform.OS === 'ios')
  }

  const onChangeIos = (
    _: DateTimePickerEvent,
    selectedTime: Date | undefined,
  ) => {
    selectedTime ? setTime(selectedTime) : null
  }

  const SetTimerIos = () => {
    timerStart(time.getHours() * 3600000 + time.getMinutes() * 60000)
    setShow(false)
  }

  return (
    <View>
      {show && Platform.OS === 'android' && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={'time'}
          timeZoneOffsetInMinutes={0}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {show && Platform.OS === 'ios' && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={show}
          // onRequestClose={() => {
          //   setModalVisible(!modalVisible)
          // }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
            <LinearGradient style={styles.modalView}>
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                display="spinner"
                onChange={onChangeIos}
                textColor="white"
                style={{
                  width: 250,
                  height: 180,
                }}
              />
              <View style={styles.BottomContainer}>
                <View style={styles.ButtonContainer}>
                  <Touchable
                    style={styles.controlItemAddContainer}
                    onPress={() => setShow(false)}>
                    <TextTitle type="title_16b" style={{ textAlign: 'center' }}>
                      {language.timer.buttonNo}
                    </TextTitle>
                  </Touchable>
                  <Touchable
                    style={styles.controlItemAddContainer}
                    onPress={SetTimerIos}>
                    <TextTitle type="title_16b" style={{ textAlign: 'center' }}>
                      {language.timer.buttonYes}
                    </TextTitle>
                  </Touchable>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  BottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ButtonContainer: {
    width: '80%',
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlItemAddContainer: {
    minWidth: 70,
    minHeight: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...typeElevation,
    padding: 10,
  },
})
