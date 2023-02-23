import Block from "../../../../utils/Block";
import { chatsData } from "../../../../utils/data/chats-data";
import { IGroup, IUser } from "../../../../utils/interfaces/IUser";
import template from "./chat-main.hbs";

interface ChatMainProps {
  isActive: boolean;
  activeChat: IUser | IGroup | undefined;
}
export class ChatMain extends Block {
  constructor(props: ChatMainProps) {
    super(props);
  }

  init() {
    if (this.props.activeChat) {
      const currentChat = chatsData.find((chat) => {
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
