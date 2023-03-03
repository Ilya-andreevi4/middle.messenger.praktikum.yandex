import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Nav } from "../../components/nav";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import { userData } from "../../utils/data";
import { AvatarsExports } from "../../utils/media-exports";
import PAGE_FIELDS from "../../utils/page-fields";
import template from "./profile-page.hbs";

export class ProfilePage extends Block {
  constructor() {
    super();
    this.props.modalIsOpen = false;
    this.props.isChangePassword = false;
    this.props.isChangeProfile = false;
  }

  protected init(): void {
    this.children.navBar = new Nav();
    this.children.avatar = new Avatar({
      src: AvatarsExports.AvatarBox,
      className: "profile-page",
      events: {
        click: () => {
          this.setProps({ modalIsOpen: true });
        },
      },
    });

    this.props.userName = userData.chatName
      ? userData.chatName
      : userData.firstName + " " + userData.lastName;

    this.children.profileForm = new Form({
      className: "profile-page",
      title: this.props.userName,
      isPopup: false,
      children: {
        inputFields: PAGE_FIELDS["profile"].map((field) => {
          return new Field({
            ...field,
            className: "profile-page",
            attributes: [
              {
                key: "placeholder",
                value: () => {
                  if (field.id === "email") {
                    return userData.email;
                  }
                  if (field.id === "login") {
                    return userData.login;
                  }
                  if (field.id === "first_name") {
                    return userData.firstName;
                  }
                  if (field.id === "last_name") {
                    return userData.lastName;
                  }
                  if (field.id === "display_name") {
                    return userData.chatName;
                  }
                  if (field.id === "phone") {
                    return userData.phone;
                  }
                  return "";
                },
              },
              { key: "readonly", value: true },
            ],
          });
        }),
        links: [
          new Link({
            className: "profile-page",
            events: {
              click: () => {
                this.setProps({ isChangeProfile: true });
              },
            },
            label: "Change profile",
          }),
          new Link({
            className: "profile-page",
            events: {
              click: () => {
                this.setProps({ isChangePassword: true });
              },
            },
            label: "Change password",
          }),
          new Link({
            className: "profile-page__link_red profile-page",
            label: "Quit from account",
            events: {
              click: () => {
                window.renderDom("login");
              },
            },
          }),
        ],
      },
      events: {
        submit: () => {},
      },
    });

    this.children.changeProfileForm = new Form({
      className: "profile-page",
      title: this.props.userName,
      isPopup: false,
      children: {
        inputFields: PAGE_FIELDS["changeProfile"].map((field) => {
          return new Field({
            ...field,
            required: true,
            className: "modal",
          });
        }),
        submitButton: new Button({
          label: "Save",
          className: "modal",
          type: "submit",
        }),
      },
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.changeProfileForm as Form).logData();
          if ((this.children.changeProfileForm as Form).isValid()) {
            this.setProps({ isChangeProfile: false });
          }
        },
      },
    });

    this.children.changePasswordForm = new Form({
      className: "profile-page",
      title: this.props.userName,
      isPopup: false,
      children: {
        inputFields: PAGE_FIELDS["changePassword"].map((field) => {
          return new Field({
            ...field,
            required: true,
            className: "modal",
          });
        }),
        submitButton: new Button({
          label: "Save",
          className: "modal",
          type: "submit",
        }),
      },
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.changePasswordForm as Form).logData();
          if ((this.children.changePasswordForm as Form).isValid()) {
            this.setProps({ isChangePassword: false });
          }
        },
      },
    });

    (this.children.changeAvatarModal as Form) = new Form({
      title: "Change Avatar",
      className: "modal",
      isPopup: true,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.changeAvatarModal as Form).logData();
          this.setProps({ modalIsOpen: false });
        },
      },
      children: {
        inputFields: [
          new Field({
            type: "file",
            className: "input-file modal",
            id: "avatar",
            name: "avatar",
            label: "Download image",
            errorText: "You should select the file",
            required: true,
            regex: /^[A-Za-z]{1,18}\.[A-Za-z]{1,5}$/,
          }),
        ],

        submitButton: new Button({
          label: "Change",
          className: "modal",
          type: "submit",
        }),
      },
    });

    this.children.sideButton = new Button({
      className: "side-panel",
      label: "",
      type: "button",
      events: {
        click: () => {
          window.renderDom("main");
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
