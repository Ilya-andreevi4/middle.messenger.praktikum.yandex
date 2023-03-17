import store, { withSelectedChatId } from "../../../../utils/Store";
import { Message } from "../../../../components/message";
import Block from "../../../../utils/Block";
import { chatsData, messagesData } from "../../../../utils/data";
import { IChat } from "../../../../utils/Interfaces";
import template from "./chat-main.hbs";

interface ChatMainProps {
  selectedChatId: number | undefined;
  isActive: boolean;
  activeChat?: IChat;
}
export class ChatMainBase extends Block<ChatMainProps> {
  constructor(props: ChatMainProps) {
    super(props);
  }

  init() {
    this.props.activeChat = chatsData.find((chat) => chat.id === this.props.selectedChatId);

    if (this.props.activeChat) {
      this.props.isActive = true;
    } else {
      this.props.isActive = false;
    }

    if (this.props.activeChat) {
      const currentMessages = messagesData.filter((message) => {
        message.chat_id === this.props.activeChat?.id;
      });
      if (currentMessages) {
        this.children.messages = currentMessages.map((message) => {
          return new Message({
            className: "message-list",
            from:
              message.user_id === store.getState().user.data?.id
                ? "You"
                : this.props.activeChat?.users?.find((child) => child.id === message.user_id)?.first_name ||
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file?.path,
            my: message.user_id === store.getState().user.data?.id,
            events: {
              click: () => {},
            },
          });
        });
      }
    }
  }

  protected componentDidUpdate(oldProps: ChatMainProps, newProps: ChatMainProps): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      const currentChatId = newProps.selectedChatId;
      const newChatState = chatsData.find((chat) => chat.id === currentChatId);
      const currentMessages = messagesData.filter((message) => {
        message.chat_id === this.props.activeChat?.id;
      });

      this.setProps({
        isActive: newChatState ? true : false,
        activeChat: newChatState,
        selectedChatId: currentChatId,
      });

      if (currentMessages) {
        this.children.messages = currentMessages.map((message) => {
          return new Message({
            className: "message-list",
            from:
              message.user_id === store.getState().user.data?.id
                ? "You"
                : this.props.activeChat?.users?.find((child) => child.id === message.user_id)?.first_name ||
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file?.path,
            my: message.user_id === store.getState().user.data?.id,
            events: {
              click: () => {},
            },
          });
        });
      } else {
        this.children.messages = [];
      }
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const ChatMain = withSelectedChatId(ChatMainBase);
