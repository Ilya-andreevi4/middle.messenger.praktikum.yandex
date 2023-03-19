import Block from "../../utils/Block";
import template from "./chat-info.hbs";
import { Avatar } from "../avatar";
import { withSelectedChatId } from "../../utils/Store";
import { ILastMessage } from "../../utils/Interfaces";
import { AvatarsExports } from "../../utils/media-exports";
import { Link } from "../link";
import chatController from "../../controllers/ChatController";
import { handleSliceText } from "../../utils/helpers";

interface ChatInfoProps {
  id: number | undefined;
  title: string;
  last_message?: ILastMessage;
  avatar?: string;
  className: string;
  isActive?: boolean;
  deleteLink?: Link;
  selectedChatId: number | undefined;
  handleChangeChat?: (id: number | undefined) => void;
  events?: {
    click?: (e: Event) => void;
  };
  unread_count?: number;
}

export class ChatInfoBase extends Block<ChatInfoProps> {
  constructor(props: ChatInfoProps) {
    super({
      ...props,
      last_message: props.last_message
        ? {
            ...props.last_message,
            content: props.last_message.content ? handleSliceText(props.last_message.content, 16) : "",
          }
        : undefined,
      events: props.events || {
        click: async (e) => {
          e.preventDefault();
          const currentId = this.props.id;

          if (currentId === this.props.selectedChatId) {
            chatController.selectChat(undefined);
            // store.set("selectedChatId", undefined);
          } else {
            if (this.props.unread_count && this.props.unread_count > 0) {
              this.props.unread_count = undefined;
            }
            chatController.selectChat(currentId);
            currentId && (await chatController.fetchChatUsers(currentId));
          }
        },
      },
    });
  }

  protected init(): void {
    this.props.isActive = this.props.id === this.props.selectedChatId;
    this.children.avatar = new Avatar({
      className: "friends",
      events: {
        click: () => {},
      },
      src: this.props.avatar || AvatarsExports.AvatarBox,
    });
    if (!this.props.unread_count || this.props.unread_count < 1) {
      this.props.unread_count = undefined;
    }
  }

  protected componentDidUpdate(oldProps: ChatInfoProps, newProps: ChatInfoProps): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      this.setProps({ isActive: this.props.id === newProps.selectedChatId, deleteLink: newProps.deleteLink });
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
