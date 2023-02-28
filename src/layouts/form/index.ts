import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
  title?: string;
  isPopup: boolean;
  className: string;
  children?: {
    inputFields?: Field[];
    submitButton?: Button;
    links?: Link[];
  };
  events: {
    submit: () => void;
  };
}
export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props);
    this.props = { ...props };
  }
  protected init(): void {
    if (this.props.children?.submitButton) {
      this.children.submitButton = this.props.children.submitButton as Button;
    }
    if (this.props.children?.inputFields) {
      this.children.inputFields = this.props.children.inputFields as Field[];
    }
    if (this.props.children?.links) {
      this.children.links = this.props.children.links as Link[];
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
