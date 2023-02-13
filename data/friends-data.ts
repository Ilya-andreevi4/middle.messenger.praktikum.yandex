import { IFriends } from "../interfaces/IFriends";

export const friendsData: IFriends = {
  people: [
    {
      avatar: "static/media/avatar-2.jpg",
      firstName: "Ryan",
      lastName: "Gosling",
      lastMessage: "Image...",
    },
    {
      avatar: "static/media/avatar-3.jpg",
      firstName: "Marie",
      lastName: "Laforet",
      lastMessage: "Ok",
    },
    {
      avatar: "static/media/avatar-4.jpg",
      firstName: "Johnny",
      lastName: "Cash",
      lastMessage: "Amazing!",
    },
  ],
  groups: [
    {
      title: "Project's chat",
      image: "",
      lastMessage: "Got it.",
      users: [
        {
          avatar: "static/media/avatar-1.jpg",
          firstName: "Ilya",
          lastName: "Orekhov",
        },
        {
          avatar: "static/media/avatar-2.jpg",
          firstName: "Ryan",
          lastName: "Gosling",
        },
        {
          avatar: "static/media/avatar-3.jpg",
          firstName: "Marie",
          lastName: "Laforet",
        },
        {
          avatar: "static/media/avatar-4.jpg",
          firstName: "Johnny",
          lastName: "Cash",
        },
      ],
    },
    {
      title: "Marie's Birthday",
      image: "static/media/avatar-5.jpg",
      lastMessage: "Video...",
      users: [
        {
          avatar: "static/media/avatar-1.jpg",
          firstName: "Ilya",
          lastName: "Orekhov",
        },
        {
          avatar: "static/media/avatar-2.jpg",
          firstName: "Ryan",
          lastName: "Gosling",
        },
        {
          avatar: "static/media/avatar-4.jpg",
          firstName: "Johnny",
          lastName: "Cash",
        },
      ],
    },
  ],
};
