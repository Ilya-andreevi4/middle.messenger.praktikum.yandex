import Block from "../../utils/Block";
import template from "./error-page.hbs";

export class ErrorPage extends Block {
  constructor() {
    super();
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
