import Block from "../../utils/Block";
// import { IconsExports } from "../../utils/MediaExports";
import template from "./icon.hbs";

interface IconProps {
  src: URL;
  alt: string;
  events: {
    click: () => void;
  };
  className: string;
}

export class Icon extends Block {
  constructor(props: IconProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
