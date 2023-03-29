import template from "./message.hbs";
import Block from "../../utils/Block";
import { IconsExports } from "../../utils/media-exports";
import { Icon } from "../icon";

interface MessageProps {
  from: string;
  className: string;
  text?: string;
  time: string;
  file?: string;
  my?: boolean;
  events: {
    click: () => void;
  };
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  protected init(): void {
    this.children.arrowDownIcon = new Icon({
      className: "image-box",
      src: IconsExports.ArrowDownIcon,
      alt: "arrow",
      events: {
        click: () => {}
      }
    });
    this.children.icon = new Icon({
      src: IconsExports.MailIcon,
      alt: "opened",
      className: "message",
      events: {
        click: () => {}
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
