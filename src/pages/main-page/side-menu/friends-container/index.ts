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
  inviteModalIsOpen?: boolean;
}
export class FriendsContainer extends Block<FriendsContainerProps> {
  constructor(props: FriendsContainerProps) {
    super(props);
    this.props.inviteModalIsOpen = false;
  }

  init() {
    this.children.friends = [] as any[];
    this.children.groups = [] as any[];

    chatsData.forEach((chat: IChat) => {
      if (!chat.isGroup) {
        (this.children.friends as any[]).push(
          new ChatInfo({
            ...chat,
            avatarSrc: chat.avatar,
            className: "chats-list",
          }),
        );
      } else {
        (this.children.groups as any[]).push(
          new ChatInfo({
            ...chat,
            avatarSrc: chat.avatar,
            className: "chats-list",
          }),
        );
      }
    });

    this.children.searchInput = PAGE_FIELDS["main"].map((field) => {
      return new Field({
        ...field,
        id: "search",
        name: "search",
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
        click: () => {
          //TODO this.children.searchInput SUBMIT
        },
      },
    });

    this.children.userIcon = new Icon({
      src: IconsExports.UserIcon,
      className: "chats-header",
      alt: "add user",
      events: {
        click: (e) => {
          e.preventDefault();
          this.setProps({ inviteModalIsOpen: true });
          (this.children.inviteModal as Form).getContent()?.addEventListener("click", handleModalClose);
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
          this.setProps({ inviteModalIsOpen: true });
          (this.children.inviteModal as Form).getContent()?.addEventListener("click", handleModalClose);
        },
      },
    });

    this.children.inviteModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Create new chat",
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          console.log("invite form children", (this.children.inviteModal as Form).children);
          this.setProps({ inviteModalIsOpen: false });
        },
      },
      children: {
        inputFields: PAGE_FIELDS["main"].map(
          (field) =>
            new Field({
              ...field,
              label: "Title",
              id: "title",
              name: "title",
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
    //Закрытие модального окна при клике на background
    const handleModalClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ inviteModalIsOpen: false });
      return (this.children.inviteModal as Form).getContent()?.removeEventListener("click", handleModalClose);
    };
    (this.children.inviteModal as Form).getContent()?.firstElementChild?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
