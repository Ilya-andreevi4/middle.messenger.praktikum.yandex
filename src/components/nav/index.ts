import Block from "../../utils/Block";
import template from "./nav.hbs";

export class Nav extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
