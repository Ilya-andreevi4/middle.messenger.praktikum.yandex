import template from "./login-page.hbs";
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
import Router from "../../utils/Router";
import { UserStateProps, withUser } from "../../utils/Store";

interface LoginPageProps extends UserStateProps {}

class LoginPageBase extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  init() {
    this.children.navBar = new Nav("");
    this.children.loader = new Loader({});
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
        }
      },
      children: {
        inputFields: PAGE_FIELDS.login.map(
          (field) =>
            new Field({
              ...field,
              className: "modal",
              type: "text",
              required: true
            })
        ),
        submitButton: new Button({
          label: "Enter",
          className: "modal",
          type: "submit"
        }),
        links: [
          new Link({
            to: Routes.Registation,
            label: "Create account",
            className: "modal"
          })
        ]
      }
    });
  }

  onSubmit() {
    if (this.props.data) {
      Router.go(Routes.Chats);
    }
    const inputFields = (this.children.loginModal as Form).children.inputFields as Field[];
    const values = inputFields.map((child) => [
      (child as Field).getName(),
      (child as Field).getValue()
    ]);

    const data = Object.fromEntries(values);
    AuthController.signin(data as SignupData);
  }

  render() {
    return this.compile(template, this.props);
  }
}
// @ts-ignore
export const LoginPage = withUser(LoginPageBase);
