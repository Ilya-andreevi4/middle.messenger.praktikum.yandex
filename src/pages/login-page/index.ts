import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Form } from "../../layouts/form";
import PAGE_FIELDS from "../../utils/page-fields";
import { Nav } from "../../components/nav";
import Block from "../../utils/Block";
import template from "./login-page.hbs";
import AuthController from "../../controllers/AuthContoller";
import { Routes, SignupData } from "../../utils/Interfaces";

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
          if ((this.children.loginModal as Form).isValid()) {
            this.onSubmit();
            //   window.renderDom("main");
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
            }),
        ),
        submitButton: new Button({
          label: "Enter",
          className: "modal",
          type: "submit",
        }),
        links: [
          new Link({
            to: Routes.Registation,
            label: "Create account",
            className: "modal",
          }),
        ],
      },
    });
  }

  onSubmit() {
    const inputFields = (this.children.loginModal as Form).children.inputFields as Field[];
    const values = inputFields.map((child) => {
      return [(child as Field).getName(), (child as Field).getValue()];
    });

    const data = Object.fromEntries(values);
    AuthController.signin(data as SignupData);
  }

  render() {
    return this.compile(template, this.props);
  }
}
