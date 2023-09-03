# Проект мессенджера для курса "Мидлфронтенд разработчик" от Яндекс Практикум.

## Проект размещён на домене: https://messenger-by-orekhov-ilya.netlify.app/

## Ссылка на pull request: https://github.com/Ilya-andreevi4/middle.messenger.praktikum.yandex/pull/7

## О проекте

На данный момент, проект в рабочем состоянии. Можно регаться и чатится. В скоре добавлю возможность отправки файлов. В проекте используется компонентный подход и приложение соответствует шаболну MVC. В этом проекте я первый раз использовал шаблонизатор Handlebars и сборщик Parcel. В проекте реализован работа с real-time сообщениями с помощью подключения через WebSocket.

![Screenshot_1](https://github.com/Ilya-andreevi4/middle.messenger.praktikum.yandex/assets/33191965/e656c28b-9f81-41e5-8ce5-349f6e1e1222)
![Screenshot_7](https://github.com/Ilya-andreevi4/middle.messenger.praktikum.yandex/assets/33191965/0526fa04-231b-4790-aa0e-332b1821661e)

Дизайн мессенджера отличается от остальных в первую очередь аватарами и блоками без скруглённых углов. При создании этого дизайна, я вдохновлялся дизайнами Steam и Discord.

![Screenshot_9](https://github.com/Ilya-andreevi4/middle.messenger.praktikum.yandex/assets/33191965/4d61c4f3-ad60-47ac-a4f7-e7ed7474de0b)
  ![Screenshot_8](https://github.com/Ilya-andreevi4/middle.messenger.praktikum.yandex/assets/33191965/e1f471c5-d88b-4ab4-b6af-537cc51b6a1a)

Приложение адаптировано под мобильные устройства.

## Скрипты для локальной работы с проектом:

### `npm install`

Установка необходимых зависимостей для работы с проектом.

### `npm run build`

Проект соберётся в папке dist.

### `npm run start`

Проект запуститься на Express, localhost:3000.

## Как пользоваться:

1. Для входа на главную страницу надо будет пройти авторизацию.
2. Для перехода на страницу профиля, на странице с чатом нажмите на иконку settings в левом правом углу в блоке профиля.
3. На странице профиля можно переключиться на редактирование профиля, изменения пароля или открыть модальное окно с изменением аватара.
4. Создать чат можно на странице чата. При нажатии иконки user или users в заголовках списков чатов: справа от "Friends" или "Groups", Выйдет модальное окно с созданием нового чата.
5. Для добавления юзеров в чат или редактирования аватара чата, в выбранном чате нужно открыть окно настроек, нажав на три точки в верхнем правом углу экрана.
6. Для просмотра списка юзеров в чате, нужно нажать на аватар чата в хедере главного чата.
