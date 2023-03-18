import { withStore } from "../../../../utils/Store";
import { Message } from "../../../../components/message";
import Block from "../../../../utils/Block";
import template from "./chat-main.hbs";
import { IMessage } from "../../../../utils/Interfaces";
import { isEqual } from "../../../../utils/helpers";

interface ChatMainProps {
  selectedChatId: number | undefined;
  isActive: boolean;
  messages: IMessage[];
  userId: number;
}
export class ChatMainBase extends Block<ChatMainProps> {
  constructor(props: ChatMainProps) {
    super(props);
  }

  init() {
    this.props.isActive = this.props.selectedChatId ? true : false;

    if (this.props.selectedChatId) {
      const currentMessages = this.props.messages;

      if (currentMessages) {
        console.log("messages in this chat ", currentMessages);
        this.children.messages = currentMessages.map((message) => {
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : `User ${message.user_id}` || //TODO Добавить имя пользователя
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file ? message.file.path : undefined,
            my: message.user_id === this.props.userId,
            events: {
              click: () => {},
            },
          });
        });
      }
    }
  }

  protected componentDidUpdate(oldProps: ChatMainProps, newProps: ChatMainProps): boolean {
    const currentChatId = newProps.selectedChatId;
    const currentMessages = newProps.messages;
    if (oldProps.selectedChatId) {
      if (!isEqual(oldProps.messages, newProps.messages)) {
        this.children.messages = currentMessages.map((message) => {
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : `User ${message.user_id}` || //TODO Добавить имя пользователя
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file ? message.file.path : undefined,
            my: message.user_id === this.props.userId,
            events: {
              click: () => {},
            },
          });
        });
        return true;
      }
    }
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      console.log("current chat id ", currentChatId);
      this.setProps({
        isActive: currentChatId && currentChatId >= 0 ? true : false,
        selectedChatId: currentChatId,
      });

      if (currentMessages && currentChatId) {
        console.log("currentMessages", currentMessages);
        this.children.messages = currentMessages.map((message) => {
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : `User ${message.user_id}` || //TODO Добавить имя пользователя
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file ? message.file.path : undefined,
            my: message.user_id === this.props.userId,
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

const withSelectedChatMessages = withStore((state) => {
  const chatId = state.selectedChatId;

  if (!chatId) {
    return {
      messages: [],
      selectedChatId: undefined,
      userId: state.user.data?.id,
    };
  }

  return {
    messages: (state.messages || {})[chatId] || [],
    selectedChatId: state.selectedChatId,
    userId: state.user.data?.id,
  };
});

//@ts-ignore
export const ChatMain = withSelectedChatMessages(ChatMainBase);
