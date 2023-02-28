import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import { userData } from "../../utils/data";
import { AvatarsExports } from "../../utils/media-exports";
import template from "./profile-page.hbs";

export class ProfilePage extends Block {
  constructor() {
    super();
    this.props.modalIsOpen = false;
    this.props.isChangePassword = false;
    this.props.isChangeProfile = false;
  }

  protected init(): void {
    this.children.avatar = new Avatar({
      src: userData.avatar ? userData.avatar : AvatarsExports.AvatarBox,
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
        inputFields: [
          new Field({
            label: "Email",
            className: "profile-page",
            id: "email",
            type: "email",
            attributes: [
              { key: "placeholder", value: userData.mail },
              { key: "readonly", value: true },
            ],
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Login",
            className: "profile-page",
            id: "login",
            type: "text",
            attributes: [
              { key: "placeholder", value: userData.login },
              { key: "readonly", value: true },
            ],
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "First name",
            className: "profile-page",
            id: "firstName",
            type: "text",
            attributes: [
              { key: "placeholder", value: userData.firstName },
              { key: "readonly", value: true },
            ],
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Last Name",
            className: "profile-page",
            id: "lastName",
            type: "text",
            attributes: [
              { key: "placeholder", value: userData.lastName },
              { key: "readonly", value: true },
            ],
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Phone",
            className: "profile-page",
            id: "phone",
            type: "tel",
            attributes: [
              { key: "placeholder", value: userData.phone },
              { key: "readonly", value: true },
              { key: "minlength", value: 10 },
              { key: "maxlength", value: 14 },
            ],
            events: {
              change: () => {},
            },
          }),
        ],
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
        submit: () => {
          // const target = (e.target as HTMLInputElement) || null;
          // console.log(target.value);
        },
      },
    });

    this.children.changeProfileForm = new Form({
      className: "profile-page",
      title: this.props.userName,
      isPopup: false,
      children: {
        inputFields: [
          new Field({
            label: "Email",
            className: "modal",
            id: "email",
            type: "email",
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Login",
            className: "modal",
            id: "login",
            type: "text",
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "First name",
            className: "modal",
            id: "firstName",
            type: "text",
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Last Name",
            className: "modal",
            id: "lastName",
            type: "text",
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Phone",
            className: "modal",
            id: "phone",
            type: "tel",
            attributes: [
              { key: "minlength", value: 10 },
              { key: "maxlength", value: 14 },
            ],
            events: {
              change: () => {},
            },
          }),
        ],
        submitButton: new Button({
          label: "Save",
          className: "modal",
          events: {
            click: () => {
              this.setProps({ isChangeProfile: false });
            },
          },
        }),
      },
      events: {
        submit: () => {
          // const target = (e.target as HTMLInputElement) || null;
          // console.log(target.value);
        },
      },
    });

    this.children.changePasswordForm = new Form({
      className: "profile-page",
      title: this.props.userName,
      isPopup: false,
      children: {
        inputFields: [
          new Field({
            label: "Old password",
            className: "modal",
            id: "old_password",
            type: "password",
            attributes: [{ key: "minlength", value: 6 }],
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "New password",
            className: "modal",
            id: "new_password",
            type: "password",
            attributes: [{ key: "minlength", value: 6 }],
            events: {
              change: () => {},
            },
          }),
          new Field({
            label: "Repeate new password",
            className: "modal",
            id: "confirm_new_password",
            type: "password",
            required: true,
            attributes: [{ key: "minlength", value: 6 }],
            events: {
              change: () => {},
            },
          }),
        ],
        submitButton: new Button({
          label: "Save",
          className: "modal",
          events: {
            click: () => {
              this.setProps({ isChangePassword: false });
            },
          },
        }),
      },
      events: {
        submit: () => {
          // const target = (e.target as HTMLInputElement) || null;
          // console.log(target.value);
        },
      },
    });

    (this.children.changeAvatarModal as Form) = new Form({
      title: "Change Avatar",
      className: "modal",
      isPopup: true,
      events: {
        submit: () => {},
      },
      children: {
        inputFields: [
          new Field({
            type: "file",
            className: "input-file modal",
            id: "input-file",
            label: "Download image",
            required: true,
            events: {
              change: () => {
                window.renderDom("profile");
              },
            },
          }),
        ],

        submitButton: new Button({
          label: "Change",
          className: "modal",
          events: {
            click: () => {
              window.renderDom("profile");
            },
          },
        }),
      },
    });

    this.children.sideButton = new Button({
      className: "side-panel",
      label: "",
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
