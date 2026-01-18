import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Modal,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient, Text, TextTitle, Touchable, View } from '@/components'
import { typeElevation } from '@/components/Shadow/typeElevaion'
import { IModalMessageProps } from './interfaces'
import { useModalMeessage, useTheme } from '@/hooks'

export const ModalMessage = ({ navigation }: IModalMessageProps) => {
  const [{ BACKGROUNDCOLOR }] = useTheme()
  const [modalMessage, { showModalMessage }] = useModalMeessage()
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height
  const [modalVisible, setModalVisible] = useState(false)

  const response = () => {
    showModalMessage({ show: false })
    console.log('modalMessage = ', modalMessage.typeMessage)

    if (modalMessage.typeMessage === 'resetPassWord') {
      navigation?.current.navigate('LoginScreen', { screen: 'LoginScreen' })
    }
  }

  useEffect(() => {
    modalMessage.show !== modalVisible
      ? setModalVisible(modalMessage.show)
      : false
  }, [modalMessage])

  return (
    <BlurView style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View
          style={{
            flex: 1,
            width: width,
            height: height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: width * 0.9,
              minHeight: 350,
              maxHeight: height * 0.5,
              top: height / 2 - 350 / 2,
              left: (width * 0.1) / 2,
              position: 'absolute',
            }}>
            <LinearGradient
              style={{
                ...styles.modalView,
                backgroundColor: BACKGROUNDCOLOR,
              }}>
              <View
                style={{
                  ...styles.modalTitleContainer,
                  backgroundColor: BACKGROUNDCOLOR,
                }}>
                <TextTitle type="title_20b">{modalMessage.title}</TextTitle>
              </View>
              <ScrollView
                style={styles.modalTextContainer}
                contentContainerStyle={styles.scrollContainer}>
                <Text type="text_14" style={{ textAlign: 'center' }}>
                  {modalMessage.message}
                </Text>
              </ScrollView>
              <View style={styles.modalBottomContainer}>
                <View style={styles.modalButtonContainer}>
                  <Touchable
                    style={styles.controlItemAddContainer}
                    onPress={response}>
                    <TextTitle type="title_16b" style={{ textAlign: 'center' }}>
                      {modalMessage.buttonYes}
                    </TextTitle>
                  </Touchable>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
  },
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
  },
  modalTitleContainer: {
    minHeight: 50,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  floatingItem: {
    width: '95%',
    height: 60,
    marginTop: 20,
    marginVertical: 30,
  },
  modalTextContainer: {
    height: '100%',
    minHeight: 50,
    width: '100%',
    padding: 20,
  },
  modalBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  modalButtonContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlItemAddContainer: {
    minWidth: 90,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...typeElevation,
    padding: 10,
    margin: 20,
  },
  scrollContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
})
