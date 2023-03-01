import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Nav } from "../../components/nav";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import PAGE_FIELDS from "../../utils/page-fields";
import template from "./registration-page.hbs";

export class RegistrationPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.navBar = new Nav();
    this.children.registrationForm = new Form({
      title: "Registration",
      className: "modal",
      isPopup: false,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.registrationForm as Form).logData();
          if ((this.children.registrationForm as Form).isValid()) {
            window.renderDom("main");
          }
        },
      },
      children: {
        inputFields: PAGE_FIELDS["registration"].map((field) => {
          return new Field({
            ...field,
            className: "modal",
            required: true,
          });
        }),
        submitButton: new Button({
          label: "Create profile",
          className: "modal",
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
