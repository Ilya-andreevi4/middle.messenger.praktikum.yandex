import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Nav } from "../../components/nav";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import PAGE_FIELDS from "../../utils/page-fields";
import template from "./registration-page.hbs";
import AuthController from "../../controllers/AuthContoller";
import { Routes, SignupData } from "../../utils/Interfaces";

interface IValues extends SignupData {
  confirm_new_password: string;
}
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
        submit: async (e: Event) => {
          e.preventDefault();
          if ((this.children.registrationForm as Form).isValid()) {
            try {
              this.onSubmit();
            } catch (e) {
              console.error(e);
            }
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
          type: "submit",
        }),
        links: [
          new Link({
            label: "Sign in",
            className: "modal",
            to: Routes.Index,
          }),
        ],
      },
    });
  }

  onSubmit() {
    const inputFields = (this.children.registrationForm as Form).children.inputFields as Field[];
    const values = inputFields.map((child) => {
      return [(child as Field).getName(), (child as Field).getValue()];
    });

    const valuesObjects = Object.fromEntries(values);

    if ((valuesObjects as unknown as IValues).confirm_new_password !== (valuesObjects as unknown as IValues).password) {
      inputFields
        .filter((field) => field.props.id === "password" || field.props.id === "confirm_new_password")
        .map((field) => {
          field.element!.classList.add("error");
          // field.setProps({ errorText: "The passwords don't match" }); TODO ошибка не меняется
        });
      alert("Введённые пароли не совпадают");
      throw new Error("Введённые пароли не совпадают");
    } else {
      inputFields
        .filter((field) => field.props.id === "password" || field.props.id === "confirm_new_password")
        .map((field) => {
          //   field.props.errorText = // TODO вернуть прежнюю ошибку
          //     "Минимум 6 символов. Введите хотя бы одну заглавную букву, одну строчную букву и цифру";
          field.element!.classList.remove("error");
        });
    }
    const data = Object.fromEntries(
      values.filter((arrVal) => {
        return arrVal[0] !== "confirm_new_password";
      }),
    );

    AuthController.signup(data as SignupData);
  }

  render() {
    return this.compile(template, this.props);
  }
}
