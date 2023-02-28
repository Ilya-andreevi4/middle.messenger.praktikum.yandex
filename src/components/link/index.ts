import Block from "../../utils/Block";
import template from "./link.hbs";

interface LinkProps {
  label: string;
  events: {
    click: () => void;
  };
  className: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
    this.props = { ...props };
  }

  render() {
    return this.compile(template, this.props);
  }
}
