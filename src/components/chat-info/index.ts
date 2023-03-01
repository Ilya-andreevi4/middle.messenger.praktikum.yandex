import Block from "../../utils/Block";
import template from "./chat-info.hbs";
import { Avatar } from "../avatar";

interface ChatInfoProps {
  id: number;
  title: string;
  lastMessage?: string;
  avatarSrc: string;
  className: string;
  time?: string;
  isActive?: boolean;
  activeChatID?: number;
  isGroup?: boolean;
  events: {
    click: (e: Event, id: number) => void;
  };
  numberNewMessages?: number;
}

export class ChatInfo extends Block<ChatInfoProps> {
  constructor(props: ChatInfoProps) {
    super(props);
    this.props = { ...props };
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
