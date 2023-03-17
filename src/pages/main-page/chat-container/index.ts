import Block from "../../../utils/Block";
import { ChatHeader } from "./chat-header";
import { ChatMain } from "./chat-main";
import { MessageInputForm } from "../../../components/message-input-form";
import template from "./chat-container.hbs";
import { IChat } from "../../../utils/Interfaces";
import { StateProps, withStore } from "../../../utils/Store";
import { Field } from "src/components/field";

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
    if (this.props.activeChat) {
      this.props.isActive = true;
    } else {
      this.props.isActive = false;
    }

    this.children.chatHeader = new ChatHeader({});

    this.children.chatMain = new ChatMain({
      ...this.props,
    });

    this.children.messageForm = new MessageInputForm({
      ...this.props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          console.log("message: ", ((this.children.messageForm as Block).children.messageInput as Field).getValue());
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const ChatContainer = withStore((state) => ({ ...state }))(ChatContainerBase);
