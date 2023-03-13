import Router from "../../utils/Router";
import Block from "../../utils/Block";
import template from "./button.hbs";

interface ButtonProps {
  label: string;
  to?: string;
  type?: "submit" | "reset" | "button" | "menu";
  events?: {
    click: () => void;
  };
  className: string;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: props.events || {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.to
      ? Router.go(this.props.to)
      : console.log("Не назначен 'to', адрес для перехода, для кнопки: ", this.props.label);
  }

  render() {
    return this.compile(template, this.props);
  }
}

// export const Button = withRouter(BaseButton);
