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

  setValue(newValue: string) {
    return ((this.element as HTMLInputElement).value = newValue);
  }

  getFile() {
    return (this.element as HTMLInputElement).files![0];
  }

  render() {
    return this.compile(template, this.props);
  }
}
