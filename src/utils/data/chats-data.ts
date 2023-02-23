import { IChat } from "../interfaces/IChat";
import { MediaExports } from "../MediaExports";
export const chatsData: IChat[] = [
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
