import { Button } from "../../components/button";
import { PopupFormAddFiles } from "../popup-form-add-files";
import { Field } from "../../components/field";
import Block from "../../utils/Block";
import template from "./message-input-form.hbs";

interface MessageInputFormProps {
  isActive: boolean;
  popIsOpen?: boolean;
  children?: Record<string, Block<any> | Block<any>[]>;
  events: {
    submit: (e: Event) => void;
  };
}

export class MessageInputForm extends Block<MessageInputFormProps> {
  constructor(props: MessageInputFormProps) {
    super(props);
    this.props.popIsOpen = false;
  }

  init() {
    this.children.popupFormAddFiles = new PopupFormAddFiles({
      className: "popper-add-files",
    });
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
