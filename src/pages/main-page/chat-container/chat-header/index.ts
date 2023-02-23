import { Avatar } from "../../../../components/avatar";
import { Icon } from "../../../../components/icon";
import Block from "../../../../utils/Block";
import { IconsExports } from "../../../../utils/media-exports";
import template from "./chat-header.hbs";

interface ChatHeaderProps {
  isActive: boolean;
  avatarSrc: string;
  userName: string;
  userStatus: string;
}
export class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  init() {
    this.props.isActive = this.props.isActive;
    this.children.avatar = new Avatar({
      src: this.props.avatarSrc,
      className: "chat-header",
      events: {
        click: () => {},
      },
    });
    this.children.moreIcon = new Icon({
      src: IconsExports.MoreIcon,
      className: "chat-header",
      alt: "more",
      events: {
        click: () => {},
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
