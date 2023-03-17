import chatController from "../../controllers/ChatController";
import Block from "../../utils/Block";
import { IconsExports } from "../../utils/media-exports";
import { Field } from "../field";
import { Icon } from "../icon";
import { PopupItem } from "../popup-item";
import template from "./popup-form-chat-action.hbs";
import { withSelectedChatId } from "../../utils/Store";

const enum PopupId {
  AddUser = "add_user",
  DeleteChat = "delete_chat",
  ChangeAvatar = "change_avatar",
}

interface PopupFormChatActionsProps {
  selectedChatId: number | undefined;
  className: string;
  handleOpenModal: () => void;
  popItems?: IPopItem[];
  popupListItems?: PopupItem[];
}

interface IPopItem {
  id: string;
  icon: string;
  title: string;
}

class PopupFormChatActionsBase extends Block<PopupFormChatActionsProps> {
  constructor(props: PopupFormChatActionsProps) {
    super(props);
  }
  protected init(): void {
    this.props.popItems = [
      {
        icon: IconsExports.MediaIcon,
        title: "Change Chat Avatar",
        id: PopupId.ChangeAvatar,
      },
      {
        icon: IconsExports.AddUserIcon,
        title: "Add User",
        id: PopupId.AddUser,
      },
      {
        icon: IconsExports.DeleteIcon,
        title: "Delete Chat",
        id: PopupId.DeleteChat,
      },
    ];
    (this.children.popupListItems as PopupItem[]) = this.props.popItems.map((item, i) => {
      return new PopupItem({
        className: this.props.className,
        icon: new Icon({
          src: item.icon,
          className: this.props.className,
          alt: "icon",
        }),
        field: new Field({
          label: item.title,
          regex: /^[\w\W]*$/,
          className: item.id === PopupId.DeleteChat ? `error ${this.props.className}` : this.props.className,
          name: "file",
          id: item.id,
          attributes: [{ key: "readonly", value: !(item.id === PopupId.ChangeAvatar) }],
          type: "file",
        }),
        events: {
          change: async (e) => {
            e.preventDefault();
            if (item.id === PopupId.ChangeAvatar && this.props.selectedChatId) {
              const file = ((this.children.popupListItems as PopupItem[])[i].children.field as Field).getFile();

              await chatController.changeChatAvatar(this.props.selectedChatId, file);
            }
          },
          click: async (e) => {
            if (this.props.selectedChatId) {
              if (item.id === PopupId.AddUser) {
                e.preventDefault();
                this.props.handleOpenModal();
              }
              if (item.id === PopupId.DeleteChat) {
                e.preventDefault();
                try {
                  chatController.delete(this.props.selectedChatId);
                  console.log("Чат успешно удалён");
                } catch (e) {
                  throw new Error("Не удалось удалить чат " + e);
                }
              }
            } else {
              console.log("Чат не выбран");
            }
          },
        },
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const PopupFormChatActions = withSelectedChatId(PopupFormChatActionsBase);
