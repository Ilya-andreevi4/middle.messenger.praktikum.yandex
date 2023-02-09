import { IFriends } from "../interfaces/IFriends";

const friendsData: IFriends = {
  people: [
    {
      avatar: "static/media/avatar-2.jpg",
      name: "Ryan",
      lastName: "Gosling",
      lastMessage: "Image...",
    },
    {
      avatar: "static/media/avatar-3.jpg",
      name: "Marie",
      lastName: "Laforet",
      lastMessage: "Ok",
    },
    {
      avatar: "static/media/avatar-4.jpg",
      name: "Johnny",
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
          name: "Ilya",
          lastName: "Orekhov",
        },
        {
          avatar: "static/media/avatar-2.jpg",
          name: "Ryan",
          lastName: "Gosling",
        },
        {
          avatar: "static/media/avatar-3.jpg",
          name: "Marie",
          lastName: "Laforet",
        },
        {
          avatar: "static/media/avatar-4.jpg",
          name: "Johnny",
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
          name: "Ilya",
          lastName: "Orekhov",
        },
        {
          avatar: "static/media/avatar-2.jpg",
          name: "Ryan",
          lastName: "Gosling",
        },
        {
          avatar: "static/media/avatar-4.jpg",
          name: "Johnny",
          lastName: "Cash",
        },
      ],
    },
  ],
};
export default friendsData;
