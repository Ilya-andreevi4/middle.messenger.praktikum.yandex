import { IChat } from "../../../../utils/Interfaces";
import Block from "../../../../utils/Block";
import template from "./friends-container.hbs";
import { IconsExports } from "../../../../utils/media-exports";
import { Icon } from "../../../../components/icon";
import { Field } from "../../../../components/field";
import { ChatInfo } from "../../../../components/chat-info";
import PAGE_FIELDS from "../../../../utils/page-fields";
import { Form } from "../../../../layouts/form";
import { Button } from "../../../../components/button";
import chatController from "../../../../controllers/ChatController";
import { StateProps, withStore } from "../../../../utils/Store";
import { isEqual } from "../../../../utils/helpers";

interface FriendsContainerProps extends StateProps {
  createChatModalIsOpen?: boolean;
  chatsIsLoaded: boolean;
}
export class FriendsContainerBase extends Block<FriendsContainerProps> {
  constructor(props: FriendsContainerProps) {
    super(props);
    this.props.createChatModalIsOpen = false;
    this.props.chatsIsLoaded = false;
  }

  init() {
    this.children.friends = ([] as Block[]) || [];
    this.children.groups = ([] as Block[]) || [];

    chatController.fetchChats().finally(() => {
      this.setProps({
        chatsIsLoaded: true,
      });
    });
    console.log("chats", this.props.chats);
    console.log("current chat", this.props.chats[0]);
    console.log("chat id", this.props.chats[0].id);
    console.log("1st chat users", this.props.chats[0].users);

    // this.props.chats.find((chat) => chat.id === this.props.selectedChatId);

    this.props.chats?.forEach((chat: IChat) => {
      if (!chat.users || chat.users?.length <= 1) {
        (this.children.friends as any[]).push(
          new ChatInfo({
            ...chat,
            last_message: chat.last_message
              ? {
                  ...chat.last_message,
                  time: new Date(chat.last_message.time).toLocaleString("ru", {
                    hour: "numeric",
                    minute: "numeric",
                    weekday: "short",
                  }),
                }
              : undefined,
            avatarSrc: chat.avatar,
            className: "chats-list",
          }),
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
                    weekday: "short",
                  }),
                }
              : undefined,
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
          this.setProps({ createChatModalIsOpen: true });
          (this.children.createChatModal as Form).getContent()?.addEventListener("click", handleModalClose);
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
          this.setProps({ createChatModalIsOpen: true });
          (this.children.createChatModal as Form).getContent()?.addEventListener("click", handleModalClose);
        },
      },
    });

    this.children.createChatModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Create new chat",
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          const inputFields = (this.children.createChatModal as Form).children.inputFields as Field[];
          const values = inputFields.map((child) => {
            return (child as Field).getValue();
          });
          await chatController.create(values[0]);
          console.log("created new chat: ", values[0]);
          this.setProps({ createChatModalIsOpen: false });
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
      this.setProps({ createChatModalIsOpen: false });
      return (this.children.createChatModal as Form).getContent()?.removeEventListener("click", handleModalClose);
    };
    (this.children.createChatModal as Form).getContent()?.firstElementChild?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  protected componentDidUpdate(oldProps: FriendsContainerProps, newProps: FriendsContainerProps): boolean {
    if (oldProps.createChatModalIsOpen !== newProps.createChatModalIsOpen) {
      this.setProps({ createChatModalIsOpen: newProps.createChatModalIsOpen });
      return true;
    }

    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.children.friends = [];
      this.children.groups = [];
      console.log("new chats", this.props.chats);
      const friendsChats = this.props.chats.map((chat) => {
        const currentChat = { ...chat };
        console.log("raspred chats", currentChat);
        if (!chat.users || chat.users?.length < 2) {
          return chat;
        }
        return;
      });
      const groupsChats = this.props.chats.map((chat) => {
        const currentChat = { ...chat };
        console.log("raspred chats", currentChat);
        if (chat.users && chat.users?.length > 2) {
          return chat;
        }
        return;
      });
      console.log(friendsChats, groupsChats);

      newProps.chats.forEach((chat) => {
        console.log("current Chat", chat);
        console.log("current Users", chat.users);

        if (!chat.users || chat.users.length <= 1) {
          (this.children.friends as any[]).push(
            new ChatInfo({
              ...chat,
              last_message: chat.last_message
                ? {
                    ...chat.last_message,
                    time: new Date(chat.last_message.time).toLocaleString("ru", {
                      hour: "numeric",
                      minute: "numeric",
                      weekday: "short",
                    }),
                  }
                : undefined,
              avatarSrc: chat.avatar,
              className: "chats-list",
            }),
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
                      weekday: "short",
                    }),
                  }
                : undefined,
              avatarSrc: chat.avatar,
              className: "chats-list",
            }),
          );
        }
      });
      this.setProps(newProps);
      return true;
    }
    if (oldProps.chatsIsLoaded !== newProps.chatsIsLoaded) {
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const FriendsContainer = withStore((state) => ({ ...state }))(FriendsContainerBase);
