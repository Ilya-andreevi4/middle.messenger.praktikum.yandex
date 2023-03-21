import template from "./chat-container.hbs";
import { ChatHeader } from "./chat-header";
import { ChatMain } from "./chat-main";
import { Field } from "../../../components/field";
import { MessageInputForm } from "../../../components/message-input-form";
import chatController from "../../../controllers/ChatController";
import MessagesController from "../../../controllers/MessagesController";
import Block from "../../../utils/Block";
import { IChat } from "../../../utils/Interfaces";
import { StateProps, withStore } from "../../../utils/Store";

interface ChatContainerProps extends StateProps {
  isActive: boolean;
  activeChat?: IChat;
}
export class ChatContainerBase extends Block<ChatContainerProps> {
  constructor(props: ChatContainerProps) {
    super(props);
    this.props = { ...props };
  }

  init() {
    this.props.activeChat = this.props.chats.find((chat) => chat.id === this.props.selectedChatId);
    this.props.isActive = !!this.props.activeChat;

    this.children.chatHeader = new ChatHeader({});

    this.children.chatMain = new ChatMain({});

    this.children.messageForm = new MessageInputForm({
      ...this.props,
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          if (!this.props.selectedChatId) {
            throw new Error("Select some chat.");
          }

          const input = (this.children.messageForm as Block).children.messageInput as Field;
          input.isValid();
          if (input.isValid()) {
            const message = input.getValue();
            input.setValue("");
            await MessagesController.sendMessage(this.props.selectedChatId, message);
            await chatController.fetchChats();
          }
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

// @ts-ignore
export const ChatContainer = withStore((state) => ({ ...state }))(ChatContainerBase);
