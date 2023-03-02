import Block from "../../utils/Block";
import { Link } from "../link";
import template from "./nav.hbs";

export class Nav extends Block {
  constructor() {
    super();
  }

  protected init(): void {
    this.children.links = [
      new Link({
        label: "505 Error Page",
        events: {
          click: () => {
            window.renderDom("error");
          },
        },
        className: "nav",
      }),
      new Link({
        label: "404 Error Page",
        events: {
          click: () => {
            window.renderDom("notFound");
          },
        },
        className: "nav",
      }),
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
