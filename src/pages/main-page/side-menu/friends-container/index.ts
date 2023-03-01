import { IChat } from "../../../../utils/Interfaces";
import Block from "../../../../utils/Block";
import template from "./friends-container.hbs";
import { IconsExports } from "../../../../utils/media-exports";
import { Icon } from "../../../../components/icon";
import { Field } from "../../../../components/field";
import { ChatInfo } from "../../../../components/chat-info";
import { chatsData } from "../../../../utils/data";
import PAGE_FIELDS from "../../../../utils/page-fields";
import { Form } from "../../../../layouts/form";
import { Button } from "../../../../components/button";

interface FriendsContainerProps {
  activeChatId: number | undefined;
  handleChangeChat: (e: Event, id: number) => void;
  inviteModalIsOpen?: boolean;
}
export class FriendsContainer extends Block<FriendsContainerProps> {
  constructor(props: FriendsContainerProps) {
    super(props);
  }

  init() {
    this.props.inviteModalIsOpen = false;
    this.children.friends = [] as ChatInfo[];
    this.children.groups = [] as ChatInfo[];
    this.children.searchInput = PAGE_FIELDS["main"].map((field) => {
      return new Field({
        ...field,
        id: "search",
        className: "chats-header",
        type: "text",
        required: false,
        label: "Search...",
      });
    });
    this.children.searchIcon = new Icon({
      src: IconsExports.SearchIcon,
      className: "chats-header",
      alt: "search",
      events: {
        click: () => {},
      },
    });
    this.children.userIcon = new Icon({
      src: IconsExports.UserIcon,
      className: "chats-header",
      alt: "add user",
      events: {
        click: (e) => {
          e.preventDefault();
          this.props.inviteModalIsOpen = !this.props.inviteModalIsOpen;
        },
      },
    });
    this.children.groupIcon = new Icon({
      src: IconsExports.GroupIcon,
      className: "chats-header",
      alt: "add group",
      events: {
        click: (e) => {
          e.preventDefault();
          this.props.inviteModalIsOpen = !this.props.inviteModalIsOpen;
        },
      },
    });
    chatsData.forEach((chat: IChat) => {
      if (!chat.isGroup) {
        (this.children.friends as ChatInfo[]).push(
          new ChatInfo({
            ...chat,
            avatarSrc: chat.avatar,
            className: "chats-list",
            isActive: chat.id === this.props.activeChatId,
            events: {
              click: (e) => {
                e.preventDefault();
                this.props.handleChangeChat(e, chat.id);
              },
            },
          })
        );
      } else {
        (this.children.groups as ChatInfo[]).push(
          new ChatInfo({
            ...chat,
            avatarSrc: chat.avatar,
            className: "chats-list",
            isActive: chat.id === this.props.activeChatId,
            events: {
              click: (e) => {
                e.preventDefault();
                this.props.handleChangeChat(e, chat.id);
              },
            },
          })
        );
      }
    });
    this.children.inviteModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Add User",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (this.children.inviteModal as Form).logData();
          if ((this.children.inviteModal as Form).isValid()) {
            this.setProps({ inviteModalIsOpen: false });
          }
        },
      },
      children: {
        inputFields: PAGE_FIELDS["main"].map(
          (field) =>
            new Field({
              ...field,
              label: "Login",
              className: "modal",
              type: "text",
              required: false,
            })
        ),
        submitButton: new Button({
          label: "Invite",
          className: "modal",
        }),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
