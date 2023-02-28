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
  className: string;
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

  protected init(): void {
    this.children.input = new Input({
      id: this.props.id,
      type: this.props.type,
      className: this.props.className,
      events: this.props.events,
      attributes: this.props.attributes,
      required: this.props.required,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
