import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
  title: string;
  buttonLabel: string;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  protected init(): void {}

  render() {
    return this.compile(template, this.props);
  }
}
