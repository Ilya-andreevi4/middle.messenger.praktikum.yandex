import Block from "../../../../utils/Block";
import { messagesData } from "../../../../utils/data";
import { IChat } from "../../../../utils/Interfaces";
import template from "./chat-main.hbs";

interface ChatMainProps {
  isActive: boolean;
  activeChat: IChat | undefined;
}
export class ChatMain extends Block {
  constructor(props: ChatMainProps) {
    super(props);
  }

  init() {
    if (this.props.activeChat) {
      const currentChat = messagesData.find((chat) => {
        if (chat.authorID === this.props.activeChat.id) {
          return chat;
        }
      });
      if (currentChat) {
        this.props.messages = currentChat.messages;
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
