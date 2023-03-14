import { Routes } from "../../utils/Interfaces";
import Block from "../../utils/Block";
import { Link } from "../link";
import template from "./nav.hbs";

export class Nav extends Block {
  protected init(): void {
    this.children.links = [
      new Link({
        label: "505 Error Page",
        to: Routes.NetworkError,
        className: "nav",
      }),
      new Link({
        label: "404 Error Page",
        to: Routes.NotFound,
        className: "nav",
      }),
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
