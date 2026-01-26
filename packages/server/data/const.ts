export const serverData = {
  AppConstants: {
    appName: 'StressOff',
  },
  APInotifications: {
    auth: {
      userNotFound: { ENG: 'User not found!', RUS: 'Пользователь не найден!' },
      errorRegistration: {
        ENG: 'Error during registration!',
        RUS: 'Ошибка при регистрации!',
      },
      duplicateUser: {
        ENG: 'A user with this name already exists!',
        RUS: 'Пользователь с таким именем уже существует!',
      },
      successfulRegistration: {
        ENG: 'The user has been successfully registered!',
        RUS: 'Пользователь успешно зарегистрирован!',
      },
      notLogged: {
        ENG: 'The user is not logged in!',
        RUS: 'Пользователь не авторизован!',
      },
      invalidPassword: {
        ENG: 'Invalid password entered!',
        RUS: 'Введен неверный пароль!',
      },
      loginError: {
        ENG: 'Login error',
        RUS: 'Ошибка входа в систему',
      },
      getUsers: {
        ENG: 'Error getting the list of users',
        RUS: 'Ошибка получения списка пользователей',
      },
      deleteUser: {
        ENG: 'The user has been deleted',
        RUS: 'Пользователь удален',
      },
      deleteUserError: {
        ENG: 'User deletion error',
        RUS: 'Ошибка удаления пользователя',
      },
      getRoles: {
        ENG: 'Error getting the list of roles',
        RUS: 'Ошибка получения списка ролей',
      },
      errorNewRole: {
        ENG: 'Ошибка при создании новой роли',
        RUS: 'Error when creating a new role',
      },
      duplicatRole: {
        ENG: 'A role with this name already exists!',
        RUS: 'Роль с таким названием уже существует!',
      },
      successfulRole: {
        ENG: 'The role has been successfully added!',
        RUS: 'Роль была успешно добавлена!',
      },
      delRoleError: {
        ENG: 'Error when deleting a role',
        RUS: 'Ошибка при удалении роли',
      },
      updateUser: {
        ENG: 'User updated!',
        RUS: 'Пользователь обновлен!',
      },
      updateUserError: {
        ENG: 'Error when changing user data!',
        RUS: 'Ошибка при изменении данных пользователя!',
      },
      findUser: {
        ENG: 'User finded!',
        RUS: 'Пользователь найден!',
      },
      findUserError: {
        ENG: 'Error when finding user data!',
        RUS: 'Ошибка при поиске данных пользователя!',
      },
      updatePassword: {
        ENG: 'The password has been changed!',
        RUS: 'Пароль изменен!',
      },
      updatePasswordForUser: {
        ENG: 'The password has been changed! The new password has been sent to the email address specified in the profile.',
        RUS: 'Пароль изменен! Новый пароль отправлен на почту, которая указана в профиле.',
      },
      updateStatusSound: {
        ENG: 'The audio status has been changed as read.',
        RUS: 'Изменен статус звука как прочитанный.',
      },
      updateStatusSoundError: {
        ENG: 'Error when changing the audio status as read.',
        RUS: 'Ошибка при изменении статуса звука как прочитанный.',
      },
    },
    notification: {
      addNotification: {
        ENG: 'Notification recorded!',
        RUS: 'Уведомление записано!',
      },
      addNotificationError: {
        ENG: 'Add notification error',
        RUS: 'Ошибка при добавлении уведомления',
      },
      updateNotification: {
        ENG: 'The notification has been updated!',
        RUS: 'Уведомление обновлено!',
      },
      updateNotificationError: {
        ENG: 'Error when updating notification!',
        RUS: 'Ошибка при изменении уведомления!',
      },
      getAllNotifications: {
        ENG: 'Get all notifications error',
        RUS: 'Ошибка при создании списка уведомлений',
      },
    },
    request: {
      addRequest: {
        ENG: 'Notification recorded!',
        RUS: 'Уведомление записано!',
      },
      addRequestError: {
        ENG: 'Add request error',
        RUS: 'Ошибка при добавлении обращения',
      },
      updateRequest: {
        ENG: 'The request has been updated!',
        RUS: 'Обращение обновлено!',
      },
      updateUnreadInRequest: {
        ENG: 'The unread in request has been updated!',
        RUS: 'Непрочитанное в обращении обновлено!',
      },
      updateRequestError: {
        ENG: 'Error when updating request!',
        RUS: 'Ошибка при изменении обращения!',
      },
      updateUnreadInRequestError: {
        ENG: 'Error when updating unread in request!',
        RUS: 'Ошибка при изменении непрочитанного в обращении!',
      },
      getAllRequets: {
        ENG: 'Get all requests error',
        RUS: 'Ошибка при создании списка обращений',
      },
      getAllRequestsByIdError: {
        ENG: 'Get all requests by Id error',
        RUS: 'Ошибка при создании списка обращений одного пользователя',
      },
      getAllRequestsByStatusError: {
        ENG: 'Get all requests by status error',
        RUS: 'Ошибка при создании списка обращений по статусу',
      },
      errorLimit: {
        RUS: 'Превышен лимит отправки одного запроса для одного пользователя! Следующее обращение можно будет отрпавить через ',
        ENG: 'The limit of sending one request for one user has been exceeded! The next request can be sent via ',
      },
    },
    data: {
      writeFullData: {
        ENG: 'The database is recorded!',
        RUS: 'База данных записана!',
      },
      writeFullDataError: {
        ENG: 'Error when writing the database',
        RUS: 'Ошибка при записи БД',
      },
      getFullDataError: {
        ENG: 'Get full data error',
        RUS: 'Ошибка при создании списка БД',
      },
      deleteDataByIdError: {
        ENG: 'Delete by id error',
        RUS: 'Ошибка при удалении записи по id',
      },
      deleteObject: {
        ENG: 'The object has been deleted!',
        RUS: 'Объект был удален!',
      },
      deleteAllDataError: {
        ENG: 'Delete all data error',
        RUS: 'Ошибка при удалении записей',
      },
      deleteAllObject: {
        ENG: 'All objects has been deleted!',
        RUS: 'Все объекты были удалены!',
      },
      updateData: {
        ENG: 'The object has been updated!',
        RUS: 'Объект был обновлен!',
      },
      updateDataError: {
        ENG: 'Error when updating!',
        RUS: 'Ошибка при изменении записи!',
      },
      addData: {
        ENG: 'The object has been added!',
        RUS: 'Объект был добавлен!',
      },
      addDataError: {
        ENG: 'Error when adding a record!',
        RUS: 'Ошибка при добавлении записи!',
      },
    },
    file: {
      addFile: {
        ENG: 'The file has been added!',
        RUS: 'Файл был добавлен!',
      },
      addFileError: {
        ENG: 'Error when writing a file!',
        RUS: 'Ошибка при записи файла!',
      },
      addDir: {
        ENG: 'The folder was created!',
        RUS: 'Папка была создана!',
      },
      errorFileExists: {
        ENG: 'Such a file already exists!',
        RUS: 'Такой файл уже существует!',
      },
      getFiles: {
        ENG: 'The list of files has been prepared!',
        RUS: 'Список файлов подготовлен!',
      },
      getFilesError: {
        ENG: 'Error when creating a file list!',
        RUS: 'Ошибка при создании списка файлов!',
      },
      getFile: {
        ENG: 'File received!',
        RUS: 'Файл получен!',
      },
      getFileError: {
        ENG: 'Error receiving the file!',
        RUS: 'Ошибка при получении файла!',
      },
    },
    message: {
      addMessage: {
        ENG: 'Message recorded!',
        RUS: 'Сообщение записано!',
      },
      addMessageError: {
        ENG: 'Add message error',
        RUS: 'Ошибка при добавлении сообщения',
      },
      getAllMessagesError: {
        ENG: 'Get all messages error',
        RUS: 'Ошибка при создании списка сообщений',
      },
      updateUnreadInMessage: {
        ENG: 'The unread in message has been updated!',
        RUS: 'Непрочитанное в сообщении обновлено!',
      },
      updateUnreadInMessageError: {
        ENG: 'Error when updating unread in message!',
        RUS: 'Ошибка при изменении непрочитанного в сообщении!',
      },
    },
  },
  authConstants: {
    passwordMinLength: 5,
    passwordMaxLength: 30,
  },
  dataConsts: {
    globalCategorySound: 'DATA_SOUNDS',
    globalCategoryMusic: 'DATA_MUSICS',
    globalSoundCategories: 'SOUNDS_Categories',
    globalMusicCategories: 'MUSICS_Categories',
    globalCategoryNotifications: 'NOTIFICATIONS',
    globalCategoryRequests: 'REQUESTS',
    globalCategoryMessages: 'MESSAGES',
    globalCategoryUsers: 'USERS',
    requestNumeration: 'MS',
    requestRange: 1000000,
    tokenRange: 1000000000,
    freeUser: 'isAnonymous',
    premiumUser: 'premiumUser',
  },
  welcomeNotification: {
    anonymousUsers: true,
    body: {
      RUS: 'Благодарим вас за выбор нашего приложения!',
      ENG: 'Thank you for choosing our app!',
    },
    date: new Date(),
    id: '1',
    img: '',
    name: 'Welcome',
    push: true,
    title: {
      RUS: 'Добро пожаловать!',
      ENG: 'Welcome!',
    },
    unread: true,
    premiumUsers: true,
    globalCategory: 'NOTIFICATIONS',
  },
  requestsConsts: {
    limitAddRequestForUser: 900000, //900000 = 15 минут,
    timeForCloseRequest: 2592000000, // 2592000000 = 30 суток
    timeForLimitOpeningRequest: 86400000, // 86400000 = 1 суток
    timeForLimitInProcessingRequest: 259200000, // 259200000 = 3 суток
    addRequest: {
      RUS: 'Ваще обращение принято под номером № ',
      ENG: 'Your request has been accepted under the number ',
    },
    changeStatusRequest: {
      RUS: 'Изменен статус обращения ',
      ENG: 'The status of the request has been changed ',
    },
    autoClosingRequest: function () {
      return {
        RUS: `Ваше обращение было автоматически закрыто по истечении ${
          this.timeForCloseRequest / 86400000
        } дней нахождения в статусе "Решено". Если вы не согласны, что ваше обращение решено, создайте пожалуйста новое обращение заново.`,
        ENG: `Your request was automatically closed after ${
          this.timeForCloseRequest / 86400000
        } days of being in the "Solved" status. If you do not agree that your request has been resolved, please create a new request again.`,
      }
    },
    statusRequestArr: [
      { name: { RUS: 'Открыто', ENG: 'Open' }, value: 'open', id: 1 },
      {
        name: { RUS: 'В обработке', ENG: 'In processing' },
        value: 'inProcessing',
        id: 2,
      },
      { name: { RUS: 'В ожидании', ENG: 'Waiting' }, value: 'waiting', id: 3 },
      { name: { RUS: 'Решено', ENG: 'Solved' }, value: 'solved', id: 4 },
      { name: { RUS: 'Закрыто', ENG: 'Closed' }, value: 'closed', id: 5 },
    ],
    updateStatusRequest: 'updateStatusRequest',
  },
  mailMessages: {
    addRequest: {
      subject: {
        RUS: 'Ваще обращение принято под номером № ',
        ENG: 'Your request has been accepted under the number ',
      },
    },
    changeStatusRequest: {
      subject: {
        RUS: 'Изменен статус обращения ',
        ENG: 'The status of the request has been changed ',
      },
    },
    footer: {
      appName: 'stressOff',
      RUS() {
        return `Вы получили это сообщение, потому что пользуетесь услугами проекта "${this.appName}". Вы всегда можете настроить получение уведомлений в настройках своего личного кабинета в мобильжном приложении "${this.appName}", перейдя в раздел «Настройки» и изменив настройку рассылки уведомлений.`
      },
      ENG() {
        return `You received this message because you use the services of the project "${this.appName}". You can always configure receiving notifications in the settings of your personal account in the mobile application "${this.appName}" by going to the "Settings" section and changing the notification distribution setting.`
      },
    },
  },
  mailConstants: {
    request: { RUS: 'Обращение № ', ENG: 'Request № ' },
    status: { RUS: 'Статус: ', ENG: 'Status: ' },
    topic: { RUS: 'Тема: ', ENG: 'Topic: ' },
    description: { RUS: 'Описание: ', ENG: 'Description: ' },
    solution: { RUS: 'Комментарии: ', ENG: 'Comments: ' },
    date: { RUS: 'Дата: ', ENG: 'Date: ' },
  },
  messageConstants: {
    checkForUnclosedRequest: {
      body: 'Произведено автоматическое закрытие обращений со статусом "Решено" и сроком более 30 суток: \n',
      title: 'Автозакрытие обращений',
    },
    checkFopOpenRequest: {
      body: 'Список открытых обращений более 1 суток: \n',
      title: 'Открытые обращения',
    },
    checkFopInProcessingRequest: {
      body: 'Список обращений в работе более 3 суток: \n',
      title: 'Открытые обращения',
    },
  },
}
