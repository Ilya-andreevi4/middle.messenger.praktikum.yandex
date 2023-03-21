import template from "./not-found-page.hbs";
import { Link } from "../../components/link";
import Block from "../../utils/Block";
import { Routes } from "../../utils/Interfaces";

export class NotFoundPage extends Block {
  protected init(): void {
    this.children.link = new Link({
      className: "error-page",
      label: "Back to chats",
      to: Routes.Chats
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
