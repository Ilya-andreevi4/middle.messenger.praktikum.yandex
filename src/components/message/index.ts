import { Icon } from "../icon";
import Block from "../../utils/Block";
import template from "./message.hbs";
import { IconsExports } from "../../utils/MediaExports";

interface MessageProps {
  from: string;
  className: string;
  text?: string;
  time: string;
  image?: string;
  my?: boolean;
  events: {
    click: () => void;
  };
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  protected init(): void {
    this.children.arrowDownIcon = new Icon({
      className: "image-box",
      src: IconsExports.ArrowDownIcon,
      alt: "arrow",
      events: {
        click: () => {},
      },
    });

    this.children.icon = new Icon({
      src: IconsExports.MailIcon,
      alt: "opened",
      className: "message",
      events: {
        click: () => {},
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
