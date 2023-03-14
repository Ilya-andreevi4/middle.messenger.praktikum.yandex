import { Routes } from "../../utils/Interfaces";
import { Link } from "../../components/link";
import Block from "../../utils/Block";
import template from "./server-error-page.hbs";

export class ErrorPage extends Block {
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
