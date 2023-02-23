import Block from "../../utils/Block";
import { AvatarsExports } from "../../utils/media-exports";
import template from "./avatar.hbs";

interface AvatarProps {
  src: string;
  events: {
    click: () => void;
  };
  className: string;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  init() {
    const avatar = this.props.src;

    if (!avatar) {
      this.props.src = AvatarsExports.AvatarBox;
    } else {
      this.props.src = avatar;
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
