import template from "./chat-main.hbs";
import { Message } from "../../../../components/message";
import Block from "../../../../utils/Block";
import { isEqual } from "../../../../utils/helpers";
import { IChat, IMessage } from "../../../../utils/Interfaces";
import { withStore } from "../../../../utils/Store";

interface ChatMainProps {
  selectedChatId: number | undefined;
  isActive: boolean;
  messages: IMessage[];
  userId: number;
  selectedChat: IChat | undefined;
  chats: IChat[];
}
export class ChatMainBase extends Block<ChatMainProps> {
  constructor(props: ChatMainProps) {
    super(props);
  }

  init() {
    this.props.isActive = !!this.props.selectedChatId;

    if (this.props.selectedChatId) {
      const currentMessages = this.props.messages;
      const currentChat = this.props.selectedChat;
      const users = currentChat?.users;

      if (currentMessages) {
        this.children.messages = currentMessages.map((message) => {
          const currentUser = users?.find((user) => user.id === message.user_id);
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : `${currentUser?.first_name} ${currentUser?.second_name}` || "User Name",
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", {
              hour: "numeric",
              minute: "numeric",
              weekday: "short"
            }),
            file: message.file ? message.file.path : undefined,
            my: message.user_id === this.props.userId,
            events: {
              click: () => {}
            }
          });
        });
      }
    }
  }

  protected componentDidUpdate(oldProps: ChatMainProps, newProps: ChatMainProps): boolean {
    const currentMessages = newProps.messages;
    if (newProps.selectedChatId) {
      if (!isEqual(oldProps.messages, newProps.messages)) {
        this.children.messages = currentMessages.map((message) => {
          const currentUser = newProps.chats
            .find((chat) => chat.id === newProps.selectedChatId)
            ?.users?.find((user) => user.id === message.user_id);
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : currentUser
                ? `${currentUser?.first_name} ${currentUser?.second_name}`
                : `User ${message.user_id}`,
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", {
              hour: "numeric",
              minute: "numeric",
              weekday: "short"
            }),
            file: message.file ? message.file.path : undefined,
            my: message.user_id === this.props.userId,
            events: {
              click: () => {}
            }
          });
        });
        return true;
      }
    }
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      if (newProps.messages && newProps.selectedChatId) {
        this.children.messages = newProps.messages.map((message) => {
          const currentUser = newProps.chats
            .find((chat) => chat.id === newProps.selectedChatId)
            ?.users?.find((user) => user.id === message.user_id);
          return new Message({
            className: "message-list",
            from:
              message.user_id === this.props.userId
                ? "You"
                : currentUser
                ? `${currentUser?.first_name} ${currentUser?.second_name}`
                : `User ${message.user_id}`,
            text: message.content,
            time: new Date(message.time).toLocaleString("ru", {
              hour: "numeric",
              minute: "numeric",
              weekday: "short"
            }),
            file: message.file ? message.file.path : undefined,
            my: message.user_id === this.props.userId,
            events: {
              click: () => {}
            }
          });
        });
      } else {
        this.children.messages = [];
      }
      this.setProps({
        isActive: !!(newProps.selectedChatId && newProps.selectedChatId >= 0),
        selectedChat: newProps.selectedChat,
        messages: newProps.messages,
        userId: newProps.userId,
        selectedChatId: newProps.selectedChatId,
        chats: newProps.chats
      });
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
      selectedChat: undefined,
      chats: state.chats
    };
  }

  return {
    messages: (state.messages || {})[chatId] || [],
    selectedChatId: state.selectedChatId,
    userId: state.user.data?.id,
    selectedChat: state.chats.find((chat) => chat.id === chatId),
    chats: state.chats
  };
});

// @ts-ignore
export const ChatMain = withSelectedChatMessages(ChatMainBase);
