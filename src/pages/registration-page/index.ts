import template from "./registration-page.hbs";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Nav } from "../../components/nav";
import AuthController from "../../controllers/AuthContoller";
import { Form } from "../../layouts/form";
import { Loader } from "../../layouts/loader";
import Block from "../../utils/Block";
import { Routes, SignupData } from "../../utils/Interfaces";
import PAGE_FIELDS from "../../utils/page-fields";

interface IValues extends SignupData {
  confirm_new_password: string;
}
export class RegistrationPage extends Block {
  init() {
    this.children.navBar = new Nav("");
    this.children.Loader = new Loader({});
    this.children.registrationForm = new Form({
      title: "Registration",
      className: "modal",
      isPopup: false,
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          if ((this.children.registrationForm as Form).isValid()) {
            try {
              this.onSubmit();
            } catch (err) {
              throw new Error(`${err}`);
            }
          }
        }
      },
      children: {
        inputFields: PAGE_FIELDS.registration.map(
          (field) =>
            new Field({
              ...field,
              className: "modal",
              required: true
            })
        ),
        submitButton: new Button({
          label: "Create profile",
          className: "modal",
          type: "submit"
        }),
        links: [
          new Link({
            label: "Sign in",
            className: "modal",
            to: Routes.Index
          })
        ]
      }
    });
  }

  onSubmit() {
    const inputFields = (this.children.registrationForm as Form).children.inputFields as Field[];
    const values = inputFields.map((child) => [
      (child as Field).getName(),
      (child as Field).getValue()
    ]);

    const valuesObjects = Object.fromEntries(values);

    if (
      (valuesObjects as unknown as IValues).confirm_new_password !==
      (valuesObjects as unknown as IValues).password
    ) {
      inputFields
        .filter(
          (field) => field.props.id === "password" || field.props.id === "confirm_new_password"
        )
        .forEach((field) => {
          field.props.errorText = "Введённые пароли не совпадают";
          field.element!.classList.add("error");
        });
      throw new Error("Введённые пароли не совпадают");
    } else {
      inputFields
        .filter(
          (field) => field.props.id === "password" || field.props.id === "confirm_new_password"
        )
        .forEach((field) => {
          field.element!.classList.remove("error");
        });
    }
    const data = Object.fromEntries(
      values.filter((keyValue) => keyValue[0] !== "confirm_new_password")
    );

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, this.props);
  }
}
