import { Avatar } from "../../../../components/avatar";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { Field } from "../../../../components/field";
import { Form } from "../../../../layouts/form";
import PAGE_FIELDS from "../../../../utils/page-fields";
import { AvatarsExports, IconsExports } from "../../../../utils/media-exports";
import Block from "../../../../utils/Block";
import template from "./chat-header.hbs";
import { IChat } from "../../../../utils/Interfaces";
import { chatsData } from "../../../../utils/data";
import { withSelectedChatId } from "../../../../utils/Store";

interface ChatHeaderProps {
  selectedChatId: number | undefined;
  activeChat?: IChat;
  isActive: boolean;
  avatarSrc: string;
  userName: string;
  userStatus: string;
  isModalOpen?: boolean;
}
export class ChatHeaderBase extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super(props);
  }

  init() {
    this.props.activeChat = chatsData.find((chat) => chat.id === this.props.selectedChatId);

    if (this.props.activeChat) {
      this.props.isActive = true;
    } else {
      this.props.isActive = false;
    }

    this.props.isModalOpen = false;

    this.props.userName = this.props.activeChat?.title || "UserName";
    this.props.userStatus = this.props.activeChat?.status || "offline";

    this.children.avatar = new Avatar({
      src: this.props.activeChat?.avatar || AvatarsExports.AvatarBox,
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
        submit: (e: Event) => {
          e.preventDefault();
          console.log((this.children.inviteModal as Form).children);
          // if ((this.children.inviteModal as Form).isValid()) {
          this.setProps({ isModalOpen: false });
          // }
        },
      },
      children: {
        inputFields: PAGE_FIELDS["main"].map(
          (field) =>
            new Field({
              ...field,
              id: "login",
              name: "login",
              label: "Login",
              className: "modal",
              type: "text",
              required: false,
            }),
        ),
        submitButton: new Button({
          label: "Invite",
          className: "modal",
          type: "submit",
        }),
      },
    });
  }

  protected componentDidUpdate(oldProps: ChatHeaderProps, newProps: ChatHeaderProps): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      const currentChatId = newProps.selectedChatId;
      const newChatState = chatsData.find((chat) => chat.id === currentChatId);
      this.setProps({
        selectedChatId: newProps.selectedChatId,
        activeChat: newChatState,
        isActive: newChatState ? true : false,
        userName: newChatState?.title || "UserName",
        userStatus: newChatState?.status || "offline",
      });
      (this.children.avatar as Avatar).setProps({ src: newChatState?.avatar });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const ChatHeader = withSelectedChatId(ChatHeaderBase);
