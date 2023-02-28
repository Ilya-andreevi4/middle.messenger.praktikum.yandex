import { IChat } from "../../../../utils/Interfaces";
import Block from "../../../../utils/Block";
import template from "./friends-container.hbs";
import { IconsExports } from "../../../../utils/media-exports";
import { Icon } from "../../../../components/icon";
import { Field } from "../../../../components/field";
import { ChatInfo } from "../../../../components/chat-info";
import { chatsData } from "../../../../utils/data";

interface FriendsContainerProps {
  activeChatId: number | undefined;
  handleChangeChat: (e: Event, id: number) => void;
  events: {
    click: () => void;
  };
}
export class FriendsContainer extends Block<FriendsContainerProps> {
  constructor(props: FriendsContainerProps) {
    super(props);
  }

  init() {
    this.children.friends = [] as ChatInfo[];
    this.children.groups = [] as ChatInfo[];
    this.children.input = new Field({
      id: "search",
      className: "chats-header",
      type: "text",
      required: false,
      label: "Search...",
    });
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

    chatsData.forEach((chat: IChat) => {
      if (!chat.isGroup) {
        (this.children.friends as ChatInfo[]).push(
          new ChatInfo({
            id: chat.id,
            avatarSrc: chat.avatar,
            title: chat.title,
            lastMessage: chat.lastMessage,
            className: "chats-list",
            numberNewMessages: chat.numberNewMessages,
            time: chat.time,
            isActive: chat.id === this.props.activeChatId,
            isGroup: chat.isGroup,
            events: {
              click: (e) => {
                e.preventDefault();
                this.props.handleChangeChat(e, chat.id);
              },
            },
          })
        );
      } else {
        (this.children.groups as ChatInfo[]).push(
          new ChatInfo({
            id: chat.id,
            avatarSrc: chat.avatar,
            title: chat.title,
            lastMessage: chat.lastMessage,
            className: "chats-list",
            numberNewMessages: chat.numberNewMessages,
            time: chat.time,
            isActive: chat.id === this.props.activeChatId,
            isGroup: chat.isGroup,
            events: {
              click: (e) => {
                e.preventDefault();
                this.props.handleChangeChat(e, chat.id);
              },
            },
          })
        );
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
