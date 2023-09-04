import template from "./button.hbs";
import Block from "../../utils/Block";
import Router from "../../utils/Router";
// create index.test.ts for this file with mocha and chai
interface ButtonProps {
  label: string;
  to?: string;
  type?: "submit" | "reset" | "button" | "menu";
  events?: {
    click: (e?: Event) => void;
  };
  className: string;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: props.events || {
        click: () => this.navigate()
      }
    });
  }

  navigate() {
    if (this.props.to) {
      Router.go(this.props.to);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
