import Block from "../../../utils/Block";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMain } from "./chat-main";
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
    this.props = { ...props };
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
      isActive: this.props.isActive,
      activeChat: this.props.activeChat,
    });
    this.children.chatInput = new ChatInput({
      isActive: this.props.isActive,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
