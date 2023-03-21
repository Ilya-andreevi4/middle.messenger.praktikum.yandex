import template from "./nav.hbs";
import Block from "../../utils/Block";
import { Routes } from "../../utils/Interfaces";
import { Link } from "../link";

export class Nav extends Block {
  protected init(): void {
    this.children.links = [
      new Link({
        label: "505 Error Page",
        to: Routes.NetworkError,
        className: "nav"
      }),
      new Link({
        label: "404 Error Page",
        to: Routes.NotFound,
        className: "nav"
      })
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
