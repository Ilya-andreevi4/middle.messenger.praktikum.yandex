import Block from "../../utils/Block";
import { Input } from "../input";
import template from "./field.hbs";

interface Attribute {
  key: string;
  value: any;
}

interface FieldProps {
  id: string;
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
        focus: () => {
          this.isValid();
        },
      },
    });
  }

  isValid() {
    const value: string = this.getValue();

    const regexError: boolean =
      !!this.props.regex && !new RegExp(this.props.regex).test(value);
    const error = this.props.required
      ? !value || regexError
      : !!value && regexError;
    if (error) {
      this.element!.classList.add("error");
    } else {
      this.element!.classList.remove("error");
    }

    return !error;
  }

  getValue() {
    const currentInput = this.getContent()?.querySelector(
      `[name=${this.props.id}]`
    ) as HTMLInputElement;
    return currentInput.value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
