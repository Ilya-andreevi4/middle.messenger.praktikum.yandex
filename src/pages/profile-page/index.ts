import AuthController from "../../controllers/AuthContoller";
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Link } from "../../components/link";
import { Nav } from "../../components/nav";
import { Form } from "../../layouts/form";
import Block from "../../utils/Block";
import { AvatarsExports } from "../../utils/media-exports";
import PAGE_FIELDS from "../../utils/page-fields";
import template from "./profile-page.hbs";
import { ChangePasswordProps, ChangeProfileProps, Routes, User } from "../../utils/Interfaces";
import { withUser } from "../../utils/Store";
import ProfileController from "../../controllers/ProfileController";
import { Loader } from "../../layouts/loader";
import { isEqual } from "../../utils/helpers";

interface ProfileProps {
  data: User;
  isLoading: boolean;
  error?: string;
  isChangeAvatar?: boolean;
  isChangePassword?: boolean;
  isChangeProfile?: boolean;
}

class ProfilePageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }
  protected init(): void {
    this.props.isChangeAvatar = false;
    this.props.isChangePassword = false;
    this.props.isChangeProfile = false;
    this.children.navBar = new Nav("");
    this.children.loader = new Loader({});
    this.children.avatar = new Avatar({
      src: this.props.data.avatar || AvatarsExports.AvatarBox,
      className: "profile-page",
      events: {
        click: () => {
          this.setProps({ isChangeAvatar: true });
        },
      },
    });

    this.props.data.display_name = this.props.data.display_name
      ? this.props.data.display_name
      : this.props.data.first_name + "_" + this.props.data.second_name;

    this.children.profileForm = new Form({
      className: "profile-page",
      title: this.props.data.display_name,
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
                  return this.props.data[field.name as keyof User];
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
              click: async () => {
                await AuthController.logout();
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
      title: this.props.data.display_name,
      isPopup: false,
      children: {
        inputFields: PAGE_FIELDS["changeProfile"].map((field) => {
          return new Field({
            ...field,
            required: true,
            className: "modal",
            attributes: [
              {
                key: "value",
                value: () => {
                  return this.props.data[field.name as keyof User];
                },
              },
            ],
          });
        }),
        submitButton: new Button({
          label: "Save",
          className: "modal",
          type: "submit",
        }),
      },
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          if ((this.children.changeProfileForm as Form).isValid()) {
            try {
              await this.handleSubmit("changeProfileForm");

              this.setProps({ isChangeProfile: false });
            } catch (e) {
              console.error(e);
            }
          }
        },
      },
    });

    this.children.changePasswordForm = new Form({
      className: "profile-page",
      title: this.props.data.display_name,
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
        submit: async (e: Event) => {
          e.preventDefault();
          if ((this.children.changePasswordForm as Form).isValid()) {
            try {
              await this.handleSubmit("changePasswordForm");
              this.setProps({ isChangePassword: false });
            } catch (e) {
              console.error(e);
            }
          }
        },
      },
    });

    this.children.changeAvatarModal = new Form({
      title: "Change Avatar",
      className: "modal",
      isPopup: true,
      events: {
        submit: async (e) => {
          e.preventDefault();
          try {
            await this.handleSubmit("changeAvatarModal");
            this.setProps({ isChangeAvatar: false });
          } catch (e) {
            console.error(e);
          }
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
        links: undefined,
      },
    });

    this.children.sideButton = new Button({
      className: "side-panel",
      label: "",
      type: "button",
      to: Routes.Chats,
    });
  }

  handleSubmit = (formName: "changeAvatarModal" | "changePasswordForm" | "changeProfileForm") => {
    //Находим у соответсвующей формы все её инпуты
    const inputFields = (this.children[formName] as Form).children.inputFields as Field[];

    if (formName === "changeAvatarModal") {
      // Отправка аватара
      const file = inputFields.map((child) => {
        return (child as Field).getFile();
      });
      return ProfileController.changeAvatar(file[0]);
    } else {
      // Отправка текстовых данных
      const values = inputFields.map((child) => {
        return [(child as Field).getName(), (child as Field).getValue()];
      });

      const valuesObjects = Object.fromEntries(values);
      // Проверяем пароли на совпедение в форме смены пароля
      if (formName === "changePasswordForm" && valuesObjects.confirm_new_password !== valuesObjects.newPassword) {
        inputFields
          .filter((field) => field.props.id === "newPassword" || field.props.id === "confirm_new_password")
          .forEach((field) => {
            field.element!.classList.add("error");
          });
        alert("Введённые пароли не совпадают");
        throw new Error("Введённые пароли не совпадают");
      } else {
        inputFields
          .filter((field) => field.props.id === "password" || field.props.id === "confirm_new_password")
          .forEach((field) => {
            field.element!.classList.remove("error");
          });
      }

      const data = Object.fromEntries(
        values.filter((keyValue) => {
          return keyValue[0] !== "confirm_new_password";
        }),
      );

      if (formName === "changeProfileForm") {
        return ProfileController.changeProfile(data as ChangeProfileProps);
      } else {
        return ProfileController.changePassword(data as ChangePasswordProps);
      }
    }
  };

  protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
    if (!isEqual(oldProps.data, newProps.data)) {
      ((this.children.profileForm as Form).children.inputFields as Field[]).forEach((field) => {
        field.setProps({ value: JSON.stringify(newProps.data[field.props.name as keyof User]) });
      });
      return true;
    }
    if (
      oldProps.isChangePassword !== newProps.isChangePassword ||
      oldProps.isChangeProfile !== newProps.isChangeProfile ||
      oldProps.isChangeAvatar !== newProps.isChangeAvatar
    ) {
      if (!newProps.isChangePassword && !newProps.isChangeProfile && !newProps.isChangeAvatar) {
        this.children.profileForm = new Form({
          className: "profile-page",
          title: this.props.data.display_name,
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
                      return this.props.data[field.name as keyof User];
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
                  click: async () => {
                    await AuthController.logout();
                  },
                },
              }),
            ],
          },
          events: {
            submit: () => {},
          },
        });
        this.setProps({ isChangeProfile: newProps.isChangeProfile, isChangePassword: newProps.isChangePassword });
        return true;
      }
    }
    if (!isEqual(oldProps, newProps)) {
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const ProfilePage = withUser(ProfilePageBase);
