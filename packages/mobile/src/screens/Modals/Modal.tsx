import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  Modal,
  useWindowDimensions,
  BackHandler,
} from 'react-native'
import { RootState } from '@/store'
import { IFavorites, IModal } from '@/store/interfaces'
import { modalShow } from '@/store/actions/modal'
import { ClearSoundList } from '@/screens/Player/functions/clearSoundList'
import { AddFavoriteMix } from 'favorites/functions/addFavoriteMix'
import { EditFavoriteMix } from 'favorites/functions/editFavoriteMix'
import { RemoveFavoritesMix } from 'favorites/functions/removeFavoriteMix'
import { RemoveFavoritesAllMix } from 'favorites/functions/removeFavoriteAllMix'
import { progressBarShow } from '@/store/actions/progressBar'
import {
  FloatLabelInput,
  LinearGradient,
  Text,
  TextTitle,
  Touchable,
  View,
} from '@/components'
import { typeElevation } from '@/components/Shadow/typeElevaion'
import { useLanguage, useTheme } from '@/hooks'

export const ModalAlert = () => {
  const [{ modalMessages }] = useLanguage()
  const [{ BACKGROUNDCOLOR, NO_ACTIVE }] = useTheme()
  const modal = useSelector<RootState>(state => state.modal) as IModal
  const favorites = useSelector<RootState>(
    state => state.favorites,
  ) as IFavorites
  const width = useWindowDimensions().width
  const height = useWindowDimensions().height
  const [modalVisible, setModalVisible] = useState(false)
  const [input, setInput] = useState('')

  const dispatch = useDispatch()
  const response = (value: boolean) => {
    !value
      ? dispatch(modalShow({ show: false }))
      : (modal.typeMessage === modalMessages.clearSoundList.typeMessage
          ? ClearSoundList()
          : null,
        modal.typeMessage === modalMessages.addFavoriteMix.typeMessage
          ? AddFavoriteMix(
              favorites.favorites.length + 1,
              input,
              modal.category as string,
            )
          : null,
        modal.typeMessage === modalMessages.editFavoriteMix.typeMessage
          ? EditFavoriteMix(modal.id as number, input)
          : null,
        modal.typeMessage === modalMessages.removeFavoriteMix.typeMessage
          ? RemoveFavoritesMix(modal.id as number)
          : null,
        modal.typeMessage === modalMessages.removeFavoriteAllMix.typeMessage
          ? RemoveFavoritesAllMix(modal.id as number)
          : null,
        modal.typeMessage === modalMessages.downloadFromCloud.typeMessage
          ? (dispatch(
              progressBarShow({
                showDownload: true,
                storage: modal.storage,
                name: modal.name,
                category: modal.category,
                id: modal.id,
              }),
            ),
            dispatch(modalShow({ show: false })))
          : null,
        modal.typeMessage === modalMessages.deleteFromDevice.typeMessage
          ? DeleteFromDevice(modal.sound, modal.id, modal.name, modal.category)
          : null,
        modal.typeMessage === modalMessages.deleteAllFromDevice.typeMessage
          ? (dispatch(
              progressBarShow({
                showDeleteAll: true,
              }),
            ),
            dispatch(modalShow({ show: false })))
          : null,
        modal.typeMessage === modalMessages.exitApp.typeMessage
          ? (BackHandler.exitApp(), dispatch(modalShow({ show: false })))
          : null)
  }

  useEffect(() => {
    modal.show !== modalVisible ? setModalVisible(modal.show) : false
  }, [modal])

  return (
    <View style={{ flex: 1 }}>
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
              height: 350,
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
                <TextTitle type="title_20b">{modal.title}</TextTitle>
              </View>
              {modal.typeMessage === modalMessages.addFavoriteMix.typeMessage ||
              modal.typeMessage ===
                modalMessages.editFavoriteMix.typeMessage ? (
                <View style={styles.view}>
                  <View style={styles.floatingItem}>
                    <FloatLabelInput
                      isPassword={false}
                      label={modal.message as string}
                      value={input}
                      hintTextColor={NO_ACTIVE}
                      containerStyles={styles.floatContainerStyle}
                      onChangeText={setInput}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.modalTextContainer}>
                  <Text type="text_14" style={{ textAlign: 'center' }}>
                    {modal.message}
                  </Text>
                </View>
              )}
              <View style={styles.modalBottomContainer}>
                <View style={styles.modalButtonContainer}>
                  {modal.typeMessage !==
                  modalMessages.sameNameFound.typeMessage ? (
                    <Touchable
                      style={styles.controlItemAddContainer}
                      onPress={() => response(false)}>
                      <TextTitle
                        type="title_16b"
                        style={{ textAlign: 'center' }}>
                        {modal.buttonCancel}
                      </TextTitle>
                    </Touchable>
                  ) : null}
                  <Touchable
                    style={styles.controlItemAddContainer}
                    onPress={() => response(true)}>
                    <Text type="text_16" style={{ textAlign: 'center' }}>
                      {modal.buttonYes}
                    </Text>
                  </Touchable>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </View>
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
    paddingBottom: 15,
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
    minHeight: 50,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  modalButtonContainer: {
    width: '60%',
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
  view: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatContainerStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 12,
  },
})
