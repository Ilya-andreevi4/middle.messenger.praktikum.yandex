import Block from "../../utils/Block";
import template from "./input.hbs";

interface InputProps {
  id: string;
  name: string;
  type: string;
  className: string;
  attributes?: any;
  required?: boolean;
  events?: {
    blur: () => void;
    focus: () => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
    this.props = { ...props };
  }

  getName() {
    return (this.element as HTMLInputElement).name;
  }

  getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
