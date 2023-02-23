import { Avatar } from "../avatar";
import Block from "../../utils/Block";
import template from "./chat-info.hbs";

interface ChatInfoProps {
  id: number;
  firstName: string;
  lastName: string;
  lastMessage?: string;
  avatarSrc: string;
  className: string;
  time?: string;
  isActive?: boolean;
  events: {
    click: () => void;
  };
  numberNewMessages?: number;
}

export class ChatInfo extends Block {
  constructor(props: ChatInfoProps) {
    super(props);
  }
  protected init(): void {
    this.children.avatar = new Avatar({
      className: "friends",
      events: {
        click: () => {},
      },
      src: this.props.avatarSrc,
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
