import Block from "../../utils/Block";
import template from "./profile-page.hbs";

export class ProfilePage extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, this.props);
  }
}
