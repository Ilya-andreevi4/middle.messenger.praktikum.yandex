import { Message } from "../../../../components/message";
import Block from "../../../../utils/Block";
import { messagesData } from "../../../../utils/data";
import { IChat } from "../../../../utils/Interfaces";
import template from "./chat-main.hbs";

interface ChatMainProps {
  isActive: boolean;
  activeChat?: IChat;
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
        this.children.messages = currentChat.messages.map((message) => {
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

  render() {
    return this.compile(template, this.props);
  }
}
