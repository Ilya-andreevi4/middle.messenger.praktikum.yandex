import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import template from "./registration-page.hbs";

export class RegistrationPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.registrationForm = new Form({
      title: "Registration",
      className: "modal",
      isPopup: false,
      events: {
        submit: () => {},
      },
      children: {
        inputFields: [
          new Field({
            label: "Email",
            className: "modal",
            id: "email",
            type: "email",
            required: true,
            events: {
              change: () => {},
            },
          }),
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
            label: "First name",
            className: "modal",
            id: "firstName",
            type: "text",
            required: true,
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Last Name",
            className: "modal",
            id: "lastName",
            type: "text",
            required: false,
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Phone",
            className: "modal",
            id: "phone",
            type: "tel",
            required: true,
            attributes: [
              { key: "minlength", value: 10 },
              { key: "maxlength", value: 14 },
            ],
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
          new Field({
            label: "Repeate password",
            className: "modal",
            id: "confirm_password",
            type: "password",
            required: true,
            attributes: [{ key: "minlength", value: 6 }],
            events: {
              change: () => {},
            },
          }),
        ],
        submitButton: new Button({
          label: "Create profile",
          className: "modal",
          events: {
            click: () => {
              window.renderDom("main");
            },
          },
        }),
        links: [
          new Link({
            label: "Sign in",
            className: "modal",
            events: {
              click: () => {
                window.renderDom("login");
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
