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
import { UserStateProps, withUser } from "../../utils/Store";
import { Loader } from "../../layouts/loader";

interface LoginPageProps extends UserStateProps {}

class LoginPageBase extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }
  init() {
    console.log("data in login page: ", this.props.data);

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

  // protected componentDidUpdate(_oldProps: UserStateProps, _newProps: UserStateProps): boolean {
  //   console.log("data in login page: ", _oldProps, _newProps);

  //   if (_oldProps.isLoading || _newProps.isLoading) {
  //     (this.children.loader as Block).setProps({ isLoading: _newProps.isLoading });
  //     return false;
  //   }
  //   return !isEqual(_oldProps.data!, _newProps.data!);
  // }

  render() {
    return this.compile(template, this.props);
  }
}
//@ts-ignore
export const LoginPage = withUser(LoginPageBase);
