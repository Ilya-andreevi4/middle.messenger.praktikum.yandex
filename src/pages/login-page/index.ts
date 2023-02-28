import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import template from "./login-page.hbs";

export class LoginPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.loginModal = new Form({
      className: "modal",
      title: "Log in",
      isPopup: false,
      events: {
        submit: () => {},
      },
      children: {
        inputFields: [
          new Field({
            label: "Login",
            className: "modal",
            id: "login",
            type: "text",
            required: true,
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Password",
            className: "modal",
            id: "password",
            type: "password",
            required: true,
            attributes: [{ key: "minlength", value: 6 }],
            events: {
              change: () => {},
            },
          }),
        ],
        submitButton: new Button({
          label: "Enter",
          className: "modal",
          events: { click: () => {} },
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
