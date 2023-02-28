import { Button } from "../../../../components/button";
import { Field } from "../../../../components/field";
import { PopListItem } from "../../../../components/pop-list-item";
import Block from "../../../../utils/Block";
import { IconsExports } from "../../../../utils/media-exports";
import template from "./chat-input.hbs";

interface ChatInputProps {
  isActive: boolean;
}
interface IPopItem {
  icon: string;
  title: string;
  className: string;
}
export class ChatInput extends Block {
  constructor(props: ChatInputProps) {
    super(props);

    this.props.popIsOpen = false as boolean;
  }

  init() {
    this.props.popItems = [
      {
        icon: IconsExports.MediaIcon,
        title: "Media",
        className: "popper-add-files",
      },
      {
        icon: IconsExports.FileAddIcon,
        title: "File",
        className: "popper-add-files",
      },
      {
        icon: IconsExports.LocationIcon,
        title: "Location",
        className: "popper-add-files",
      },
    ];

    this.children.popListItems = this.props.popItems.map(
      (item: IPopItem) =>
        new PopListItem({
          icon: item.icon,
          title: item.title,
          className: item.className,
          events: { click: () => {} },
        })
    );
    this.children.input = new Field({
      id: "message",
      type: "text",
      className: "message",
      label: "Message...",
      required: false,
    });
    this.children.attachButton = new Button({
      className: "attachment chat-footer",
      label: "",
      events: {
        click: () => {
          this.props.popIsOpen = !this.props.popIsOpen;
        },
      },
    });
    this.children.sendButton = new Button({
      className: "send chat-footer",
      label: "",
      events: {
        click: () => {},
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
