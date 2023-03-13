import { Routes } from "../../utils/Interfaces";
import { Link } from "../../components/link";
import Block from "../../utils/Block";
import template from "./not-found-page.hbs";

export class NotFoundPage extends Block {
  constructor() {
    super();
  }
  protected init(): void {
    this.children.link = new Link({
      className: "error-page",
      label: "Back to chats",
      to: Routes.Chats,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
