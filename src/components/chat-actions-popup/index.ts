import chatController from "../../controllers/ChatController";
import Block from "../../utils/Block";
import { IconsExports } from "../../utils/media-exports";
import { Field } from "../field";
import { Icon } from "../icon";
import { PopupItem } from "../popup-item";
import template from "./popup-form-chat-action.hbs";
import { withSelectedChatId } from "../../utils/Store";

interface PopupFormChatActionsProps {
  selectedChatId: number | undefined;
  className: string;
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
        title: "Add User",
        id: "add_user",
      },
      {
        icon: IconsExports.FileAddIcon,
        title: "Delete Chat",
        id: "delete_chat",
      },
    ];
    (this.children.popupListItems as PopupItem[]) = this.props.popItems.map((item) => {
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
          className: this.props.className,
          name: "text",
          id: item.id,
          attributes: [{ key: "readonly", value: true }],
          type: "text",
        }),
        events: {
          click: async (e) => {
            console.log("click on ", item.id);

            e.preventDefault();
            if (this.props.selectedChatId) {
              if (item.id === "add_user") {
                console.log("Add User Handler");
              }
              if (item.id === "delete_chat") {
                try {
                  chatController.delete(this.props.selectedChatId);
                  console.log("Чат успешно удалён");
                } catch (e) {
                  throw new Error("Не удалось удалить чат " + e);
                }
                console.log("Delete Chat Handler");
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
