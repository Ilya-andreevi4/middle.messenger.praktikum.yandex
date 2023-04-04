import template from "./chat-container.hbs";
import { ChatHeader } from "./chat-header";
import { ChatMain } from "./chat-main";
import { Field } from "../../../components/field";
import { MessageInputForm } from "../../../components/message-input-form";
import chatController from "../../../controllers/ChatController";
import MessagesController from "../../../controllers/MessagesController";
import Block from "../../../utils/Block";
import { StateProps, withStore } from "../../../utils/Store";

interface ChatContainerProps extends StateProps {
  isActive: boolean;
}
export class ChatContainerBase extends Block<ChatContainerProps> {
  constructor(props: ChatContainerProps) {
    super(props);
  }

  init() {
    this.props.isActive = !!this.props.selectedChatId;

    this.children.chatHeader = new ChatHeader({});

    this.children.chatMain = new ChatMain({});

    this.children.messageForm = new MessageInputForm({
      ...this.props,
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          if (!this.props.selectedChatId) {
            throw new Error("Select some chat.");
          }

          const input = (this.children.messageForm as Block).children.messageInput as Field;
          input.isValid();
          if (input.isValid()) {
            const message = input.getValue();
            input.setValue("");
            await MessagesController.sendMessage(this.props.selectedChatId, message);
            await chatController.fetchChats();
          }
        }
      }
    });
  }

  protected componentDidUpdate(
    oldProps: ChatContainerProps,
    newProps: ChatContainerProps
  ): boolean {
    if (oldProps.selectedChatId !== newProps.selectedChatId) {
      this.setProps({
        isActive: !!newProps.selectedChatId
      });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

// @ts-ignore
export const ChatContainer = withStore((state) => ({ ...state }))(ChatContainerBase);
