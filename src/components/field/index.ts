import Block from "../../utils/Block";
import template from "./field.hbs";
import { Input } from "../input";

interface Attribute {
  key: string;
  value: any;
}

interface FieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value?: string;
  regex: RegExp;
  className: string;
  errorText?: string;
  required?: boolean;
  attributes?: Attribute[];
  events?: {
    change: () => void;
  };
}

export class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    super(props);
    this.props = { ...props };
  }

  init() {
    this.children.input = new Input({
      ...this.props,
      events: {
        blur: () => {
          this.isValid();
        },
      },
    });
  }

  isValid() {
    const value: string = this.getValue();

    const regexError: boolean = !!this.props.regex && !new RegExp(this.props.regex).test(value);
    const error = this.props.required ? !value || regexError : !!value && regexError;
    if (error) {
      this.element!.classList.add("error");
    } else {
      this.element!.classList.remove("error");
    }

    return !error;
  }

  getValue() {
    const value = (this.children.input as Input).getValue();
    return value;
  }

  getFile() {
    const value = (this.children.input as Input).getFile();
    return value;
  }

  getName() {
    const name = (this.children.input as Input).getName();
    return name;
  }

  render() {
    return this.compile(template, this.props);
  }
}
