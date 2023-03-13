import Block from "../../utils/Block";
import template from "./link.hbs";
import Router from "../../utils/Router";

interface LinkProps {
  to?: string;
  label: string;
  events?: {
    click: () => void;
  };
  className: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: props.events || {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.to && Router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
