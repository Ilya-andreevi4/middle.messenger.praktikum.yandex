import template from "./chat-header.hbs";
import { Avatar } from "../../../../components/avatar";
import { Button } from "../../../../components/button";
import { PopupFormChatActions } from "../../../../components/chat-actions-popup";
import { ChatInfoBase } from "../../../../components/chat-info";
import { Field } from "../../../../components/field";
import { Icon } from "../../../../components/icon";
import { Link } from "../../../../components/link";
import chatController from "../../../../controllers/ChatController";
import { Form } from "../../../../layouts/form";
import Block from "../../../../utils/Block";
import { isEqual } from "../../../../utils/helpers";
import { IChat } from "../../../../utils/Interfaces";
import { AvatarsExports, IconsExports } from "../../../../utils/media-exports";
import PAGE_FIELDS from "../../../../utils/page-fields";
import { StateProps, withStore } from "../../../../utils/Store";

interface ChatHeaderProps extends StateProps {
  activeChat?: IChat;
  isActive: boolean;
  avatarSrc: string;
  userName: string;
  userStatus: string;
  isModalOpen: boolean;
  isSettingsOpen: boolean;
  isUserListOpen: boolean;
}
export class ChatHeaderBase extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super(props);
    this.props.isModalOpen = false;
    this.props.isSettingsOpen = false;
    this.props.isUserListOpen = false;
  }

  init() {
    this.props.activeChat = this.props.chats.find((chat) => chat.id === this.props.selectedChatId);

    this.props.isActive = !!this.props.selectedChatId;
    if (this.props.activeChat) {
      this.props.userName = this.props.activeChat.title || "ChatName";
      this.props.userStatus =
        this.props.activeChat.status || `${this.props.activeChat.users?.length} users`;
      this.children.userList = this.props.activeChat?.users
        ? this.props.activeChat.users.map(
            (user) =>
              new ChatInfoBase({
                deleteLink:
                  user.id !== this.props.user.data?.id
                    ? new Link({
                        className: "error user-delete",
                        label: "kick out",
                        events: {
                          click: async (e) => {
                            e.preventDefault();
                            if (this.props.selectedChatId) {
                              const data = {
                                users: [user.id],
                                chatId: this.props.selectedChatId
                              };
                              await chatController.deleteUserFromChat(data);
                              await chatController.fetchChatUsers(this.props.selectedChatId);
                            }
                          }
                        }
                      })
                    : undefined,
                avatar: `https://ya-praktikum.tech/api/v2/resources${user.avatar}`,
                isActive: false,
                title: user.display_name || user.first_name,
                className: "user-info",
                id: user.id,
                selectedChatId: this.props.selectedChatId
              })
          )
        : [];
    }

    this.children.inviteModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Add User",
      events: {
        submit: async (e: Event) => {
          e.preventDefault();

          if ((this.children.inviteModal as Form).isValid() && this.props.selectedChatId) {
            const inputFields = (this.children.inviteModal as Form).children.inputFields as Field[];
            const usersID = inputFields.map((child) => Number((child as Field).getValue()));
            const data = {
              users: [...usersID],
              chatId: this.props.selectedChatId
            };
            await chatController.addUserToChat(data);
            await chatController.fetchChatUsers(this.props.selectedChatId);
            this.setProps({ isModalOpen: false });
          }
        }
      },
      children: {
        inputFields: PAGE_FIELDS.invite.map(
          (field) =>
            new Field({
              ...field,
              id: "id",
              name: "id",
              label: "User ID",
              className: "modal",
              type: "text",
              required: true
            })
        ),
        submitButton: new Button({
          label: "Invite",
          className: "modal",
          type: "submit"
        })
      }
    });

    // Закрытие окна с приглашением и попапа с настройками чата при клике на background
    const handleStopPropagation: (e: Event) => void = (e) => {
      e.stopPropagation();
    };

    const handleSettingsClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ isSettingsOpen: false });
      return (
        window.removeEventListener("mousedown", handleSettingsClose),
        (this.children.settingsPopup as Block)
          .getContent()
          ?.removeEventListener("mousedown", handleStopPropagation)
      );
    };

    const handleModalClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ isModalOpen: false });
      return (
        window.removeEventListener("mousedown", handleModalClose),
        (this.children.inviteModal as Form)
          .getContent()
          ?.firstElementChild?.removeEventListener("mousedown", handleStopPropagation)
      );
    };

    const handleUserListClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ isUserListOpen: false });
      return (
        window.removeEventListener("mousedown", handleUserListClose),
        (this.children.userList as Block[]).forEach((child) =>
          child.getContent()?.removeEventListener("mousedown", handleStopPropagation)
        )
      );
    };

    this.children.settingsPopup = new PopupFormChatActions({
      className: "chat-action-popup",
      handleOpenModal: () => {
        this.setProps({ isModalOpen: true });
        window.addEventListener("mousedown", handleModalClose);
        (this.children.inviteModal as Form)
          .getContent()
          ?.firstElementChild?.addEventListener("mousedown", handleStopPropagation);
      }
    });

    this.children.moreIcon = new Icon({
      src: IconsExports.MoreIcon,
      className: "chat-header",
      alt: "more",
      events: {
        click: (e) => {
          e.preventDefault();
          this.setProps({ isSettingsOpen: true });
          window.addEventListener("mousedown", handleSettingsClose);
          (this.children.settingsPopup as Block)
            .getContent()
            ?.addEventListener("mousedown", handleStopPropagation);
        }
      }
    });

    this.children.avatar = new Avatar({
      src: this.props.activeChat?.avatar || AvatarsExports.AvatarBox,
      className: "chat-header",
      events: {
        click: async (e) => {
          e.preventDefault();
          this.setProps({ isUserListOpen: true });
          window.addEventListener("mousedown", handleUserListClose);
          (this.children.userList as Block[]).forEach((child) =>
            child.getContent()?.addEventListener("mousedown", handleStopPropagation)
          );
        }
      }
    });
  }

  protected componentDidUpdate(oldProps: ChatHeaderProps, newProps: ChatHeaderProps): boolean {
    const currentChatId = newProps.selectedChatId;
    const newChatState = newProps.chats.find((chat) => chat.id === currentChatId);
    const oldChatState = oldProps.chats.find((chat) => chat.id === oldProps.selectedChatId);

    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.setProps({
        selectedChatId: newProps.selectedChatId,
        activeChat: newChatState,
        isActive: !!newChatState,
        userName: newChatState?.title || "ChatName",
        userStatus: newChatState?.status || `${newChatState?.users?.length} users`,
        chats: newProps.chats
      });
      (this.children.avatar as Avatar).setProps({
        src: newProps.activeChat?.avatar || AvatarsExports.AvatarBox
      });

      return true;
    }

    if (oldProps.isModalOpen !== newProps.isModalOpen) {
      this.setProps({
        isModalOpen: newProps.isModalOpen,
        userStatus: newChatState?.status || `${newChatState?.users?.length} users`
      });
      (this.children.avatar as Avatar).setProps({
        src: newProps.activeChat?.avatar || AvatarsExports.AvatarBox
      });

      return true;
    }

    if (oldProps.isSettingsOpen !== newProps.isSettingsOpen) {
      this.setProps({
        isSettingsOpen: newProps.isSettingsOpen,
        userStatus: newChatState?.status || `${newChatState?.users?.length} users`
      });
      (this.children.avatar as Avatar).setProps({
        src: newProps.activeChat?.avatar || AvatarsExports.AvatarBox
      });

      return true;
    }

    if (oldProps.isUserListOpen !== newProps.isUserListOpen) {
      this.setProps({
        isUserListOpen: newProps.isUserListOpen,
        userStatus: newChatState?.status || `${newChatState?.users?.length} users`
      });
      (this.children.avatar as Avatar).setProps({
        src: newProps.activeChat?.avatar || AvatarsExports.AvatarBox
      });

      this.children.userList = newProps.activeChat?.users
        ? newProps.activeChat.users.map(
            (user) =>
              new ChatInfoBase({
                avatar: `https://ya-praktikum.tech/api/v2/resources${user.avatar}`,
                isActive: false,
                title: user.display_name || user.first_name,
                className: "user-info",
                last_message: { user: { ...user }, time: "", content: `ID: ${user.id}` },
                id: user.id,
                events: {
                  click(e) {
                    e.preventDefault();
                  }
                },
                selectedChatId: this.props.selectedChatId,
                deleteLink:
                  user.id !== this.props.user.data?.id
                    ? new Link({
                        className: "link_red user-delete",
                        label: "kick out",
                        events: {
                          click: async (e) => {
                            e.stopPropagation();
                            if (this.props.selectedChatId) {
                              const data = {
                                users: [user.id],
                                chatId: this.props.selectedChatId
                              };
                              await chatController.deleteUserFromChat(data);
                              this.setProps({
                                isUserListOpen: false
                              });
                            }
                          }
                        }
                      })
                    : undefined
              })
          )
        : [];
      return true;
    }
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      this.setProps({
        selectedChatId: newProps.selectedChatId,
        activeChat: newChatState,
        isActive: !!newChatState,
        userName: newChatState?.title || "ChatName",
        userStatus: newChatState?.status || `${newChatState?.users?.length} users`
      });
      (this.children.avatar as Avatar).setProps({
        src: newChatState?.avatar || AvatarsExports.AvatarBox
      });

      return true;
    }

    if (oldChatState?.users?.length !== newChatState?.users?.length) {
      this.setProps({
        userStatus: `${newChatState?.users?.length} users`
      });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

// @ts-ignore
export const ChatHeader = withStore((state) => ({ ...state }))(ChatHeaderBase);
