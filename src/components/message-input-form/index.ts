import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { PopListItem } from "../../components/pop-list-item";
import Block from "../../utils/Block";
import { IconsExports } from "../../utils/media-exports";
import template from "./message-input-form.hbs";

interface MessageInputFormProps {
  isActive: boolean;
  popIsOpen?: boolean;
  popItems?: IPopItem[];
  children?: Record<string, Block<any> | Block<any>[]>;
  events: {
    submit: (e: Event) => void;
  };
}
interface IPopItem {
  icon: string;
  title: string;
  className: string;
}

export class MessageInputForm extends Block<MessageInputFormProps> {
  constructor(props: MessageInputFormProps) {
    super(props);
    this.props.popIsOpen = false;
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
    this.children.messageInput = new Field({
      id: "message",
      regex: /^[\w\W]*$/,
      type: "text",
      className: "message",
      label: "Message...",
      required: false,
    });
    this.children.attachButton = new Button({
      className: "attachment message-input-form",
      label: "",
      events: {
        click: () => {
          this.props.popIsOpen = !this.props.popIsOpen;
        },
      },
    });
    this.children.sendButton = new Button({
      className: "send message-input-form",
      type: "submit",
      label: "",
    });
  }

  get data() {
    return (this.children.messageInput as Field).getValue();
  }

  logData() {
    console.log("New message: ", this.data);
  }

  render() {
    return this.compile(template, this.props);
  }
}
