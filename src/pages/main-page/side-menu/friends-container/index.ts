import { IChat } from "../../../../utils/Interfaces";
import Block from "../../../../utils/Block";
import template from "./friends-container.hbs";
import { IconsExports } from "../../../../utils/media-exports";
import { Icon } from "../../../../components/icon";

interface FriendsContainerProps {
  chats: IChat[];
}

export class FriendsContainer extends Block {
  constructor(props: FriendsContainerProps) {
    super(props);
    this.props.friends = props.chats.filter((chat) => !chat.isGroup);
    this.props.groups = props.chats.filter((chat) => chat.isGroup);
    // Иконки хедеров для чатов
  }

  init() {
    this.children.searchIcon = new Icon({
      src: IconsExports.SearchIcon,
      className: "chats-header",
      alt: "search",
      events: {
        click: () => {},
      },
    });
    this.children.userIcon = new Icon({
      src: IconsExports.UserIcon,
      className: "chats-header",
      alt: "add user",
      events: {
        click: () => {},
      },
    });
    this.children.groupIcon = new Icon({
      src: IconsExports.GroupIcon,
      className: "chats-header",
      alt: "add group",
      events: {
        click: () => {},
      },
    });
  }

  // TODO: Выбор чата с помощью клика
  handleClick(ChatId: number) {
    console.log("Click on chat #", ChatId);

    // Находим текущий чат
    // const activeChatIndex = chatsData.findIndex((chat) => chat.isActive);

    // let prevChat;
    // // Закрываем текущий чат
    // if (activeChatIndex >= 0) {
    //   prevChat = {
    //     ...chatsData[activeChatIndex],
    //     isActive: false,
    //   };
    //   chatsData[activeChatIndex] = prevChat;
    // } else {
    //   console.error("Chat is not defined");
    // }

    // // Если нажат открытый чат, то закрываем его
    // if (prevChat?.id === ChatId) {
    //   // this.props.chats.setProps(chatsData);
    //   // В ином случае => открываем выбранный чат.
    // } else if (chatsData.some((c) => c.id === ChatId)) {
    //   const currentFriendId = chatsData.findIndex((c) => c.id === ChatId);
    //   chatsData[currentFriendId] = {
    //     ...chatsData[currentFriendId],
    //     isActive: true,
    //   };
    // }
    // // this.props.chats.setProps(chatsData);
    // // this.props.friends.setProps(friendsData.friends);
    // // this.props.group.setProps(friendsData.groups);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      handleClick: this.handleClick,
    });
  }
}
