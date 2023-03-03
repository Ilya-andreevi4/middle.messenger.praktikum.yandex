import { Link } from "../../components/link";
import Block from "../../utils/Block";
import template from "./server-error-page.hbs";

export class ErrorPage extends Block {
  constructor() {
    super();
  }

  protected init(): void {
    this.children.link = new Link({
      className: "error-page",
      label: "Back to chats",
      events: {
        click: () => {
          window.renderDom("main");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
