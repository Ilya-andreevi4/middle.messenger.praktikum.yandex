import Block from "../../utils/Block";
import template from "./chat-info.hbs";
import { Avatar } from "../avatar";
import store, { withSelectedChatId } from "../../utils/Store";

interface ChatInfoProps {
  id: number;
  title: string;
  lastMessage?: string;
  avatarSrc: string;
  className: string;
  time?: string;
  isActive?: boolean;
  selectedChatId: number;
  isGroup?: boolean;
  handleChangeChat: (id: number | undefined) => void;
  events: {
    click: (e: Event) => void;
  };
  numberNewMessages?: number;
}

export class ChatInfoBase extends Block<ChatInfoProps> {
  constructor(props: ChatInfoProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: (e) => {
        e.preventDefault();
        const currentId = this.props.id;

        if (currentId === this.props.selectedChatId) {
          store.set("selectedChatId", undefined);
        } else {
          store.set("selectedChatId", currentId);
        }
      },
    };

    this.props.isActive = this.props.id === this.props.selectedChatId;
    this.children.avatar = new Avatar({
      className: "friends",
      events: {
        click: () => {},
      },
      src: this.props.avatarSrc,
    });
  }

  protected componentDidUpdate(oldProps: ChatInfoProps, newProps: ChatInfoProps): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      this.setProps({ isActive: this.props.id === newProps.selectedChatId });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

//@ts-ignore
export const ChatInfo = withSelectedChatId(ChatInfoBase);
