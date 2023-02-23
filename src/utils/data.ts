import { AvatarsExports, MediaExports } from "./media-exports";
import { IChat, IСhatting, IUser } from "./Interfaces";

export const userData: IUser = {
  id: 20,
  avatar: AvatarsExports.Avatar_1,
  mail: "pochta@yandex.ru",
  login: "ivanivanov",
  firstName: "Ilya",
  lastName: "Orekhov",
  chatName: "Ilya Orekhov",
  phone: "+7 (909) 967 30 30",
  password: "string",
  status: "online",
};

export const chatsData: IChat[] = [
  {
    id: 0,
    avatar: AvatarsExports.Avatar_2,
    title: "Ryan Gosling",
    lastMessage: "Image...",
    numberNewMessages: 2,
    time: "14:03",
    isActive: false,
    status: "online",
    isGroup: false,
  },
  {
    id: 1,
    avatar: AvatarsExports.Avatar_3,
    title: "Marie Laforet",
    lastMessage: "Ok",
    time: "sun 13:33",
    isActive: false,
    status: "offline",
    isGroup: false,
  },
  {
    id: 2,
    avatar: AvatarsExports.Avatar_4,
    title: "Johnny Cash",
    lastMessage: "Amazing!",
    time: "15:41",
    isActive: true,
    status: "online",
    isGroup: false,
  },
  {
    id: 3,
    title: "Project's chat",
    avatar: AvatarsExports.Avatar_6,
    lastMessage: "Got it.",
    numberNewMessages: 12,
    time: "14:03",
    isActive: false,
    isGroup: true,
    users: [
      {
        id: 4,
        avatar: "/src/static/media/avatar-1.jpg",
        firstName: "Ilya",
        lastName: "Orekhov",
        status: "online",
      },
      {
        id: 5,
        avatar: "/src/static/media/avatar-2.jpg",
        firstName: "Ryan",
        lastName: "Gosling",
        status: "online",
      },
      {
        id: 6,
        avatar: "/src/static/media/avatar-3.jpg",
        firstName: "Marie",
        lastName: "Laforet",
        status: "offline",
      },
      {
        id: 7,
        avatar: "/src/static/media/avatar-4.jpg",
        firstName: "Johnny",
        lastName: "Cash",
        status: "online",
      },
    ],
  },
  {
    id: 8,
    title: "Marie's Birthday",
    avatar: AvatarsExports.Avatar_5,
    lastMessage: "Video...",
    time: "14:44",
    isActive: false,
    isGroup: true,
    users: [
      {
        id: 9,
        avatar: "/src/static/media/avatar-1.jpg",
        firstName: "Ilya",
        lastName: "Orekhov",
        status: "online",
      },
      {
        id: 10,
        avatar: "/src/static/media/avatar-2.jpg",
        firstName: "Ryan",
        lastName: "Gosling",
        status: "online",
      },
      {
        id: 11,
        avatar: "/src/static/media/avatar-4.jpg",
        firstName: "Johnny",
        lastName: "Cash",
        status: "online",
      },
    ],
  },
];

export const messagesData: IСhatting[] = [
  {
    author: "Johnny Cash",
    authorID: 2,
    messages: [
      {
        from: "Johnny Cash",
        text: "Thank you! Good luck!",
        time: "09:13",
      },
      {
        from: "You",
        time: "14:56",
        image: MediaExports.ChatPhoto,
        my: true,
      },
      {
        from: "Johnny Cash",
        text: "Amazing!",
        time: "15:41",
      },
    ],
  },
];
