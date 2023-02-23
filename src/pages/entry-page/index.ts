import Block from "../../utils/Block";
import template from "./entry-page.hbs";

export class EntryPage extends Block {
  constructor() {
    super();
  }

  init() {}

  render() {
    return this.compile(template, this.props);
  }
}
