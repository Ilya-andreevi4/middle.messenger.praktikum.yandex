import Block from "../../../utils/Block";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMain } from "./chat-main";
import template from "./chat-container.hbs";
import { chatsData } from "../../../utils/data";

interface ChatContainerProps {
  isActive: boolean;
}
export class ChatContainer extends Block {
  constructor(props: ChatContainerProps) {
    super(props);
  }

  init() {
    const activeChat = chatsData.find((chat) => chat.isActive);
    if (activeChat) {
      this.props.isActive = true;
    }
    this.children.chatHeader = new ChatHeader({
      isActive: this.props.isActive,
      avatarSrc: activeChat ? activeChat.avatar : "",
      userName: activeChat ? activeChat.title : "",
      userStatus: activeChat?.status ? activeChat.status : "",
    });
    this.children.chatMain = new ChatMain({
      isActive: this.props.isActive,
      activeChat: activeChat,
    });
    this.children.chatInput = new ChatInput({
      isActive: this.props.isActive,
      popIsOpen: false,
    });
  }

  componentDidUpdate(
    oldProps: ChatContainerProps,
    newProps: ChatContainerProps
  ) {
    if (!newProps) return false;
    if (oldProps.isActive !== newProps.isActive) {
      if (Array.isArray(this.children)) {
        this.children.map((child) => {
          child.setProps({ newProps });
        });
      }
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}
