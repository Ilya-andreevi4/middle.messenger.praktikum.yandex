import { Button } from "../../../../components/button";
import Block from "../../../../utils/Block";
import { IconsExports } from "../../../../utils/MediaExports";
import template from "./chat-input.hbs";

interface ChatInputProps {
  isActive: boolean;
}
export class ChatInput extends Block {
  constructor(props: ChatInputProps) {
    super(props);
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

    this.children.attachButton = new Button({
      className: "attachment chat-footer",
      label: "",
      events: {
        click: () => {},
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
