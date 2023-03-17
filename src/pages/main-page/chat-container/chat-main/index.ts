import { StateProps, withStore } from "../../../../utils/Store";
import { Message } from "../../../../components/message";
import Block from "../../../../utils/Block";
import template from "./chat-main.hbs";

interface ChatMainProps extends StateProps {
  selectedChatId: number | undefined;
  isActive: boolean;
  userId: number;
}
export class ChatMainBase extends Block<ChatMainProps> {
  constructor(props: ChatMainProps) {
    super(props);
  }

  init() {
    // this.props.activeChat = this.props.chats.find((chat) => chat.id === this.props.selectedChatId);

    if (this.props.selectedChatId) {
      this.props.isActive = true;
    } else {
      this.props.isActive = false;
    }
    console.log("active chatId: ", this.props.selectedChatId);
    console.log("messages: ", this.props.messages);

    if (this.props.selectedChatId) {
      const currentMessages = this.props.messages;

      if (currentMessages) {
        console.log("messages: ", currentMessages);

        this.children.messages = Object.values(currentMessages).map(([id, message]) => {
          console.log("Id? ", id);

          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : `User ${message.user_id}` || //TODO Добавить имя пользователя
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file?.path,
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
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      const currentChatId = newProps.selectedChatId;
      const currentMessages = newProps.messages;
      console.log(currentChatId);
      this.setProps({
        isActive: currentChatId && currentChatId >= 0 ? true : false,
        selectedChatId: currentChatId,
      });

      if (currentMessages) {
        this.children.messages = Object.values(currentMessages).map(([id, message]) => {
          console.log("Id? ", id);
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : `User ${message.user_id}` || //TODO Добавить имя пользователя
                  "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", { hour: "numeric", minute: "numeric", weekday: "short" }),
            file: message.file?.path,
            my: message.user_id === this.props.user.data?.id,
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
