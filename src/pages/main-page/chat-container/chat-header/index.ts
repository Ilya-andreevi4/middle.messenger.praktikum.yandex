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
import { StateProps, withStore } from "../../../../utils/Store";
import { PopupFormChatActions } from "../../../../components/chat-actions-popup";
import chatController from "../../../../controllers/ChatController";
import { ChatInfoBase } from "../../../../components/chat-info";

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
    this.props.isActive = this.props.activeChat ? true : false;

    this.props.userName = this.props.activeChat?.title || "UserName";
    this.props.userStatus = this.props.activeChat?.status || "offline";

    const handleUserListClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ isUserListOpen: false });
      return (
        window.removeEventListener("mousedown", handleUserListClose),
        (this.children.userList as Block[]).forEach((child) =>
          child.getContent()?.removeEventListener("mousedown", handleStopPropagation),
        )
      );
    };

    this.children.avatar = new Avatar({
      src: this.props.activeChat?.avatar || AvatarsExports.AvatarBox,
      className: "chat-header",
      events: {
        click: async (e) => {
          e.preventDefault();
          console.log("click");
          if (this.props.selectedChatId) {
            await chatController.fetchChatUsers(this.props.selectedChatId);
          }

          this.setProps({ isUserListOpen: true });
          window.addEventListener("mousedown", handleUserListClose);
          (this.children.userList as Block[]).forEach((child) =>
            child.getContent()?.addEventListener("mousedown", handleStopPropagation),
          );
        },
      },
    });

    this.children.inviteModal = new Form({
      className: "modal",
      isPopup: true,
      title: "Add User",
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          console.log("trying add user...");

          if ((this.children.inviteModal as Form).isValid() && this.props.selectedChatId) {
            console.log("values is valid...");
            const inputFields = (this.children.inviteModal as Form).children.inputFields as Field[];
            const usersID = inputFields.map((child) => {
              return Number((child as Field).getValue());
            });
            const data = {
              users: [...usersID],
              chatId: this.props.selectedChatId,
            };
            await chatController.addUserToChat(data);
            this.setProps({ isModalOpen: false });
          }
        },
      },
      children: {
        inputFields: PAGE_FIELDS["invite"].map(
          (field) =>
            new Field({
              ...field,
              id: "id",
              name: "id",
              label: "User ID",
              className: "modal",
              type: "text",
              required: true,
            }),
        ),
        submitButton: new Button({
          label: "Invite",
          className: "modal",
          type: "submit",
        }),
      },
    });

    //Закрытие окна с приглашением и попапа с настройками чата при клике на background

    const handleStopPropagation: (e: Event) => void = (e) => {
      e.stopPropagation();
    };

    const handleSettingsClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ isSettingsOpen: false });
      return (
        window.removeEventListener("mousedown", handleSettingsClose),
        (this.children.settingsPopup as Block).getContent()?.removeEventListener("mousedown", handleStopPropagation)
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

    this.children.settingsPopup = new PopupFormChatActions({
      className: "chat-action-popup",
      handleOpenModal: () => {
        this.setProps({ isModalOpen: true });
        window.addEventListener("mousedown", handleModalClose);
        (this.children.inviteModal as Form)
          .getContent()
          ?.firstElementChild?.addEventListener("mousedown", handleStopPropagation);
      },
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
          (this.children.settingsPopup as Block).getContent()?.addEventListener("mousedown", handleStopPropagation);
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: ChatHeaderProps, newProps: ChatHeaderProps): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      console.log("change chat");

      const currentChatId = newProps.selectedChatId;
      const newChatState = newProps.chats.find((chat) => chat.id === currentChatId);
      this.setProps({
        selectedChatId: newProps.selectedChatId,
        activeChat: newChatState,
        isActive: newChatState ? true : false,
        userName: newChatState?.title || "UserName",
        userStatus: newChatState?.status || "offline",
        chats: newProps.chats,
      });
      (this.children.avatar as Avatar).setProps({ src: newChatState?.avatar || AvatarsExports.AvatarBox });

      return true;
    }
    if (oldProps.isModalOpen !== newProps.isModalOpen) {
      this.setProps({ isModalOpen: newProps.isModalOpen });
      return true;
    }
    if (oldProps.isSettingsOpen !== newProps.isSettingsOpen) {
      this.setProps({ isSettingsOpen: newProps.isSettingsOpen });
      return true;
    }
    if (oldProps.isUserListOpen !== newProps.isUserListOpen) {
      this.setProps({ isUserListOpen: newProps.isUserListOpen });
      this.children.userList = newProps.activeChat?.users
        ? newProps.activeChat.users.map((user) => {
            return new ChatInfoBase({
              avatar: `https://ya-praktikum.tech/api/v2/resources${user.avatar}`,
              isActive: false,
              title: user.display_name || user.first_name,
              className: "user-info",
              id: user.id,
              selectedChatId: this.props.selectedChatId,
            });
          })
        : [];
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const ChatHeader = withStore((state) => ({ ...state }))(ChatHeaderBase);
