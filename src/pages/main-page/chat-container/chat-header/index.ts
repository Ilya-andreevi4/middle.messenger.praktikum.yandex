import { Avatar } from "../../../../components/avatar";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { Field } from "../../../../components/field";
import { Form } from "../../../../layouts/form";
import Block from "../../../../utils/Block";
import { IconsExports } from "../../../../utils/media-exports";
import template from "./chat-header.hbs";

interface ChatHeaderProps {
  isActive: boolean;
  avatarSrc: string;
  userName: string;
  userStatus: string;
  isModalOpen?: boolean;
}
export class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  init() {
    this.props.isModalOpen = false;
    this.props.isActive = this.props.isActive;
    this.children.avatar = new Avatar({
      src: this.props.avatarSrc,
      className: "chat-header",
      events: {
        click: () => {},
      },
    });
    this.children.moreIcon = new Icon({
      src: IconsExports.MoreIcon,
      className: "chat-header",
      alt: "more",
      events: {
        click: () => {
          this.props.isModalOpen = !this.props.isModalOpen;
        },
      },
    });

    this.children.inviteModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Add User",
      events: {
        submit: () => {},
      },
      children: {
        inputFields: [
          new Field({
            id: "login",
            type: "text",
            label: "Login",
            className: "modal",
            required: true,
          }),
        ],
        submitButton: new Button({
          label: "Invite",
          className: "modal",
          events: {
            click: () => {
              this.props.isModalOpen = false;
            },
          },
        }),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
