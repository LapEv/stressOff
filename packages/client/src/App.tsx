import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import './App.css'
import { Context } from './main'
import { MODAL } from 'data/modal'
import { errorHandler } from 'utils/errorHandler'
import { io } from 'socket.io-client'
import { check } from 'api/userAPI'
import { IUser } from 'store/Users/interfaces'
import { LoadData } from 'api/dataAPI'
import { IData } from 'store/Data/interfaces'
import { appData } from 'data/app'
import { AppLoading } from 'pages'
import ErrorBoundary from 'components/ErrorBoundary'
import {
  Loading,
  Modal,
  ModalMessage,
  ModalMessageSlide,
  ModalSlide,
  Sidebar,
} from 'components'
import { AppRouter } from './AppRouter'
// import { MESSAGES_ROUTE, REQUESTS_ROUTE } from 'data/sidebar'

export const App = observer(() => {
  const { modal, data, user } = useContext(Context)
  const [startLoading, setStartLoading] = useState(true)
  // const [loading, setLoading] = useState(false)

  const setVisible = (bool: boolean) => {
    modal.setIsVisible(bool)
  }

  const setSlideVisible = (bool: boolean) => {
    modal.setIsSlideVisible(bool)
  }

  const Start = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = (await check()) as IUser
        user.setUser(response)
        user.setIsAuth(true)
        const db = await LoadData()
        resolve(db)
      } catch (e) {
        reject(e)
      }
    })
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setStartLoading(false)
      return
    }
    Start()
      .then(db => {
        data.setAllData(db as IData)
      })
      .catch(e => {
        modal.setShowModal(
          MODAL.modalMessageTitle.error,
          errorHandler(e) as string,
        )
      })
      .finally(() => {
        setStartLoading(false)
      })

    // const socket = io(process.env.REACT_APP_API_URL, {
    //   transports: ['websocket'],
    // })

    // socket.on('server', ({ newMessage }) => {
    //   console.log(newMessage)
    //   if (newMessage.globalCategory === appData.globalCategory.MESSAGES) {
    //     data.addMessage(newMessage)
    //     modal.setShowModalSlide({
    //       title: `Server: ${newMessage.title}`,
    //       description: newMessage.body,
    //       to: MESSAGES_ROUTE,
    //       object: newMessage,
    //     })
    //     setTimeout(() => {
    //       modal.setIsSlideVisible(false)
    //     }, appData.messageVisibleTime)
    //   }
    //   if (newMessage.globalCategory === appData.globalCategory.REQUESTS) {
    //     data.addRequest(newMessage)
    //     modal.setShowModalSlide({
    //       title: `Request: ${newMessage.topic}`,
    //       description: newMessage.description,
    //       to: REQUESTS_ROUTE,
    //       object: newMessage,
    //     })
    //     setTimeout(() => {
    //       modal.setIsSlideVisible(false)
    //     }, appData.messageVisibleTime)
    //   }
    // })
    // console.log(
    //   'Вычисления количества вынести на сервер и грузить постепенно бд',
    // )
    // console.log(
    //   'Не нравиться, пользователь не авторизован постоянно выскакивает',
    // )
    // console.log('middleware на socket')
    // console.log(
    //   'Напоминание об открытых обращениях разделить на open and inprocess по времени',
    // )

    // console.log('один клик на дропдаун открывает весь список')
    // console.log('очистить all console log')
    // console.log(
    //   'Посмотреть замыкание CONST emptyUsername, изменить this. на переменую'
    // );

    // console.log('Описание API');
    // console.log('Не работает push notification');
    // console.log('Не работает Request push notification, add & update');
    // return () => {
    //   socket.close()
    // }
  }, [])

  const responseModal = (answer: string | boolean) => {
    answer ? modal.setResponse(answer as string) : setVisible(false)
    if (answer && modal.type === 'exit') {
      user.setExit()
      localStorage.removeItem('token')
      modal.setIsVisible(false)
    }
  }

  if (startLoading) {
    return <AppLoading />
  }

  return (
    <ErrorBoundary>
      <Modal visible={modal._isVisible} setVisible={setVisible}>
        <ModalMessage
          title={modal.title}
          description={modal.description}
          type={modal.type}
          buttons={modal.buttons}
          response={responseModal}
          input={modal.input}
          // value={value}
          // responseText={responseText}
        />
      </Modal>
      <ModalSlide
        visible={modal._isSlideVisible}
        setVisibleSlide={setSlideVisible}
        to={modal.to}
        object={modal.object}>
        <ModalMessageSlide
          title={modal.title}
          description={modal.description}
        />
      </ModalSlide>
      <Loading />
      {user.isAuth ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Sidebar />
          <AppRouter />
        </div>
      ) : (
        <AppRouter />
      )}
    </ErrorBoundary>
  )
})
