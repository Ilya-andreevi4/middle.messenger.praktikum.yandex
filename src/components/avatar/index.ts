import template from "./avatar.hbs";
import Block from "../../utils/Block";
import { AvatarsExports } from "../../utils/media-exports";

interface AvatarProps {
  src: string;
  events: {
    click: (e: Event) => void;
  };
  className: string;
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
  }

  init() {
    if (!this.props.src) {
      this.props.src = AvatarsExports.AvatarBox;
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
