import template from "./popup-item.hbs";
import Block from "../../utils/Block";
import { Field } from "../field";
import { Icon } from "../icon";

interface PopupItemProps {
  icon: Icon;
  field: Field;
  className: string;
  events: {
    change?: (e: Event) => void;
    click?: (e: Event) => void;
  };
}

export class PopupItem extends Block<PopupItemProps> {
  constructor(props: PopupItemProps) {
    super(props);
  }

  get data() {
    return (this.children.field as Field).getValue();
  }

  logData() {
    // eslint-disable-next-line
    console.log("Chosen file: ", this.data);
  }

  render() {
    return this.compile(template, this.props);
  }
}
