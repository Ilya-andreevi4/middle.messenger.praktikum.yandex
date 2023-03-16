import { Button } from "../../components/button";
import { Field } from "../../components/field";
import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
  title?: string;
  isPopup: boolean;
  className: string;
  children?: {
    inputFields?: Field[];
    submitButton?: Button;
    links?: Block[];
  };
  events: {
    submit: (e: Event) => void;
  };
}
export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  protected init(): void {
    if (this.props.children?.submitButton) {
      this.children.submitButton = this.props.children.submitButton;
    }
    if (this.props.children?.inputFields) {
      this.children.inputFields = this.props.children.inputFields;
    }
    if (this.props.children?.links) {
      this.children.links = this.props.children.links;
    }
  }

  isValid() {
    let result = true;
    (this.children.inputFields as Field[]).forEach((field) => {
      result = field.isValid() && result;
    });
    return result;
  }

  render() {
    return this.compile(template, this.props);
  }
}
