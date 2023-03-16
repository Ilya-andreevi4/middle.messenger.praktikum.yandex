import { withSelectedChatId } from "../../../../utils/Store";
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
      const currentMessages = messagesData.find((chat) => {
        if (chat.authorID === this.props.activeChat?.id) {
          return chat;
        }
      });
      if (currentMessages) {
        this.children.messages = currentMessages.messages.map((message) => {
          return new Message({
            className: "message-list",
            from: message.from,
            text: message.text,
            time: message.time,
            image: message.image,
            my: message.my,
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
      const currentMessages = messagesData.find((chat) => {
        if (chat.authorID === newChatState?.id) {
          return chat;
        }
      });

      this.setProps({
        isActive: newChatState ? true : false,
        activeChat: newChatState,
        selectedChatId: currentChatId,
      });

      if (currentMessages) {
        this.children.messages = currentMessages.messages.map((message) => {
          return new Message({
            className: "message-list",
            from: message.from,
            text: message.text,
            time: message.time,
            image: message.image,
            my: message.my,
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
