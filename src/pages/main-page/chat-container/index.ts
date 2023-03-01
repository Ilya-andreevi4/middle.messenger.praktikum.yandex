import Block from "../../../utils/Block";
import { ChatHeader } from "./chat-header";
import { ChatMain } from "./chat-main";
import { MessageInputForm } from "../../../components/message-input-form";
import template from "./chat-container.hbs";
import { IChat } from "../../../utils/Interfaces";
import { AvatarsExports } from "../../../utils/media-exports";

interface ChatContainerProps {
  isActive: boolean;
  activeChat?: IChat;
}
export class ChatContainer extends Block<ChatContainerProps> {
  constructor(props: ChatContainerProps) {
    super(props);
  }

  init() {
    if (this.props.activeChat) {
      this.props.isActive = true;
    }
    this.children.chatHeader = new ChatHeader({
      isActive: this.props.isActive,
      avatarSrc: this.props.activeChat?.avatar || AvatarsExports.AvatarBox,
      userName: this.props.activeChat?.title || "UserName",
      userStatus: this.props.activeChat?.status || "offline",
    });
    this.children.chatMain = new ChatMain({
      ...this.props,
    });
    this.children.messageForm = new MessageInputForm({
      ...this.props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.messageForm as MessageInputForm).logData();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
