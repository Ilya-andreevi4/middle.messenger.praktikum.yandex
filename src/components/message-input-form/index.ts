import template from "./message-input-form.hbs";
import Block from "../../utils/Block";
import { withSelectedChatId } from "../../utils/Store";
import { PopupFormAddFiles } from "../add-files-popup";
import { Button } from "../button";
import { Field } from "../field";

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
  constructor(props: MessageInputFormProps) {
    super(props);
    this.props.popIsOpen = false;
  }

  init() {
    if (this.props.selectedChatId && this.props.selectedChatId >= 0) {
      this.props.isActive = true;
    } else {
      this.props.isActive = false;
    }

    this.children.messageInput = new Field({
      errorText: "Write something...",
      id: "message",
      regex: /^[\w\W]{1,}$/,
      type: "text",
      className: "message-input-chat message",
      label: "Message...",
      name: "message",
      required: true
    });

    this.children.sendButton = new Button({
      className: "send message-input-form",
      type: "submit",
      label: ""
    });

    this.children.popupFormAddFiles = new PopupFormAddFiles({
      className: "popper-add-files"
    });

    // Закрытие popup при клике на background
    const handleModalClose: (e: Event) => void = (e) => {
      e.preventDefault();
      this.setProps({ popIsOpen: false });
      return window.removeEventListener("mousedown", handleModalClose);
    };

    (this.children.popupFormAddFiles as PopupFormAddFiles)
      .getContent()
      ?.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });

    this.children.attachButton = new Button({
      className: "attachment message-input-form",
      label: "",
      type: "button",
      events: {
        click: (e) => {
          e.preventDefault();
          this.setProps({ popIsOpen: !this.props.popIsOpen });
          window.addEventListener("mousedown", handleModalClose);
        }
      }
    });
  }

  get data() {
    return (this.children.messageInput as Field).getValue();
  }

  logData() {
    // eslint-disable-next-line
    console.log("New message: ", this.data);
  }

  protected componentDidUpdate(
    oldProps: MessageInputFormProps,
    newProps: MessageInputFormProps
  ): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      const currentChatId = newProps.selectedChatId;
      this.setProps({ isActive: currentChatId !== undefined });
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

// @ts-ignore
export const MessageInputForm = withSelectedChatId(MessageInputFormBase);
