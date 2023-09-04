import template from "./friends-container.hbs";
import { Button } from "../../../../components/button";
import { ChatInfo } from "../../../../components/chat-info";
import { Field } from "../../../../components/field";
import { Icon } from "../../../../components/icon";
import chatController from "../../../../controllers/ChatController";
import { Form } from "../../../../layouts/form";
import Block from "../../../../utils/Block";
import { isEqual } from "../../../../utils/helpers";
import { IChat } from "../../../../utils/Interfaces";
import { IconsExports } from "../../../../utils/media-exports";
import PAGE_FIELDS from "../../../../utils/page-fields";
import { StateProps, withStore } from "../../../../utils/Store";

interface FriendsContainerProps extends StateProps {
  createChatModalIsOpen?: boolean;
}
export class FriendsContainerBase extends Block<FriendsContainerProps> {
  constructor(props: FriendsContainerProps) {
    super(props);
    this.props.createChatModalIsOpen = false;
  }

  init() {
    this.handleSortChats();

    this.children.createChatModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Create new chat",
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          const inputFields = (this.children.createChatModal as Form).children
            .inputFields as Field[];
          const values = inputFields.map((child) => (child as Field).getValue());
          await chatController.create(values[0]);
          this.setProps({ createChatModalIsOpen: false });
        }
      },
      children: {
        inputFields: PAGE_FIELDS.main.map(
          (field) =>
            new Field({
              ...field,
              label: "Title",
              id: "title",
              name: "title",
              className: "modal",
              type: "text",
              required: false
            })
        ),
        submitButton: new Button({
          label: "Invite",
          className: "modal",
          type: "submit"
        })
      }
    });

    this.children.searchInput = PAGE_FIELDS.main.map(
      (field) =>
        new Field({
          ...field,
          id: "search",
          name: "search",
          className: "chats-header",
          type: "text",
          required: false,
          label: "Search..."
        })
    );

    this.children.searchIcon = new Icon({
      src: IconsExports.SearchIcon,
      className: "chats-header",
      alt: "search",
      events: {
        click: () => {
          // TODO this.children.searchInput SUBMIT
        }
      }
    });

    // Закрытие модального окна при клике на background
    (this.children.createChatModal as Form)
      .getContent()
      ?.firstElementChild?.addEventListener("click", (e) => {
        e.stopPropagation();
      });

    const handleModalClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ createChatModalIsOpen: false });
      return (this.children.createChatModal as Form)
        .getContent()
        ?.removeEventListener("click", handleModalClose);
    };

    this.children.userIcon = new Icon({
      src: IconsExports.UserIcon,
      className: "chats-header",
      alt: "add user",
      events: {
        click: (e) => {
          e.preventDefault();
          this.setProps({ createChatModalIsOpen: true });
          (this.children.createChatModal as Form)
            .getContent()
            ?.addEventListener("click", handleModalClose);
        }
      }
    });

    this.children.groupIcon = new Icon({
      src: IconsExports.GroupIcon,
      className: "chats-header",
      alt: "add group",
      events: {
        click: (e) => {
          e.preventDefault();
          this.setProps({ createChatModalIsOpen: true });
          (this.children.createChatModal as Form)
            .getContent()
            ?.addEventListener("click", handleModalClose);
        }
      }
    });
  }

  protected handleSortChats() {
    this.children.friends = [];
    this.children.groups = [];
    const { chats } = this.props;
    chats.forEach((chat: IChat) => {
      if (!chat.users || chat.users.length <= 2) {
        (this.children.friends as any[]).push(
          new ChatInfo({
            ...chat,
            last_message: chat.last_message
              ? {
                  ...chat.last_message,
                  time: new Date(chat.last_message.time).toLocaleString("ru", {
                    hour: "numeric",
                    minute: "numeric",
                    weekday: "short"
                  })
                }
              : undefined,
            avatarSrc: chat.avatar,
            className: "chats-list"
          })
        );
      } else if (chat.users.length > 2) {
        (this.children.groups as any[]).push(
          new ChatInfo({
            ...chat,
            last_message: chat.last_message
              ? {
                  ...chat.last_message,
                  time: new Date(chat.last_message.time).toLocaleString("ru", {
                    hour: "numeric",
                    minute: "numeric",
                    weekday: "short"
                  })
                }
              : undefined,
            avatarSrc: chat.avatar,
            className: "chats-list"
          })
        );
      }
    });
  }

  protected componentDidUpdate(
    oldProps: FriendsContainerProps,
    newProps: FriendsContainerProps
  ): boolean {
    if (oldProps.createChatModalIsOpen !== newProps.createChatModalIsOpen) {
      this.setProps({ createChatModalIsOpen: newProps.createChatModalIsOpen });
      return true;
    }

    if (oldProps.user.isLoading !== newProps.user.isLoading) {
      this.handleSortChats();
      return true;
    }

    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.handleSortChats();
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

// @ts-ignore
export const FriendsContainer = withStore((state) => ({ ...state }))(FriendsContainerBase);
