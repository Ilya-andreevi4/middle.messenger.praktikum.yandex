import Block from "../../utils/Block";
import template from "./modal.hbs";

export class Modal extends Block {
  constructor() {
    super();
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
