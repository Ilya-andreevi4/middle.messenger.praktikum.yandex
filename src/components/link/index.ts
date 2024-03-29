import template from "./link.hbs";
import Block from "../../utils/Block";
import Router from "../../utils/Router";

interface LinkProps {
  to?: string;
  label: string;
  events?: {
    click: (e: Event) => void;
  };
  className: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: props.events || {
        click: () => this.navigate()
      }
    });
  }

  navigate() {
    if (!this.props.to) return;
    Router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
