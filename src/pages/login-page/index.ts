import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Form } from "../../layouts/form";
import PAGE_FIELDS from "../../utils/page-fields";
import Block from "../../utils/Block";
import template from "./login-page.hbs";
import { Nav } from "../../components/nav";

export class LoginPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.navBar = new Nav();
    this.children.loginModal = new Form({
      title: "Log in",
      className: "modal",
      isPopup: false,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.loginModal as Form).logData();
          if ((this.children.loginModal as Form).isValid()) {
            window.renderDom("main");
          }
        },
      },
      children: {
        inputFields: PAGE_FIELDS["login"].map(
          (field) =>
            new Field({
              ...field,
              className: "modal",
              type: "text",
              required: true,
            })
        ),
        submitButton: new Button({
          label: "Enter",
          className: "modal",
        }),
        links: [
          new Link({
            label: "Create account",
            className: "modal",
            events: {
              click: () => {
                window.renderDom("registration");
              },
            },
          }),
        ],
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
