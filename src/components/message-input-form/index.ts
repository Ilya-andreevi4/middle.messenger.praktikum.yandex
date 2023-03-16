import { Button } from "../../components/button";
import { PopupFormAddFiles } from "../popup-form-add-files";
import { Field } from "../../components/field";
import Block from "../../utils/Block";
import template from "./message-input-form.hbs";
import { withSelectedChatId } from "../../utils/Store";

interface MessageInputFormProps {
  selectedChatId: number | undefined;
  isActive: boolean;
  popIsOpen: boolean;
  children?: Record<string, Block<any> | Block<any>[]>;
  events: {
    submit: (e: Event) => void;
  };
}

class MessageInputFormBase extends Block<MessageInputFormProps> {
  protected popIsOpen: boolean = false;
  constructor(props: MessageInputFormProps) {
    super(props);
    this.props.popIsOpen = this.popIsOpen;
  }

  init() {
    if (this.props.selectedChatId && this.props.selectedChatId >= 0) {
      this.props.isActive = true;
    } else {
      this.props.isActive = false;
    }
    this.children.popupFormAddFiles = new PopupFormAddFiles({
      className: "popper-add-files",
    });
    this.children.messageInput = new Field({
      id: "message",
      regex: /^[\w\W]*$/,
      type: "text",
      className: "message",
      label: "Message...",
      name: "message",
      required: false,
    });
    this.children.attachButton = new Button({
      className: "attachment message-input-form",
      label: "",
      type: "button",
      events: {
        click: (e) => {
          e.preventDefault();

          this.setProps({ popIsOpen: !this.props.popIsOpen });
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

  protected componentDidUpdate(oldProps: MessageInputFormProps, newProps: MessageInputFormProps): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      const currentChatId = newProps.selectedChatId;
      this.setProps({ isActive: currentChatId !== undefined ? true : false });
      return true;
    }
    if (oldProps.popIsOpen !== newProps.popIsOpen) {
      this.setProps({ popIsOpen: newProps.popIsOpen });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const MessageInputForm = withSelectedChatId(MessageInputFormBase);
