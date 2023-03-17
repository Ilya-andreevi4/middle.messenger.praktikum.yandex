import Block from "../../utils/Block";
import template from "./avatar.hbs";
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

  protected componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
    if (oldProps.src !== newProps.src) {
      this.setProps({ src: newProps.src });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}
