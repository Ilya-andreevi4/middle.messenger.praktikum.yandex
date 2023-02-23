import Block from "../../utils/Block";
import template from "./not-found-page.hbs";

export class NotFoundPage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
