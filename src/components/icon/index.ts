import Block from "../../utils/Block";
import template from "./icon.hbs";

interface IconProps {
  src: string;
  alt: string;
  events?: {
    click: (e: Event) => void;
  };
  className: string;
}

export class Icon extends Block<IconProps> {
  constructor(props: IconProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
