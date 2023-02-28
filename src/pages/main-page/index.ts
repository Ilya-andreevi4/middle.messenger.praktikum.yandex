import { Nav } from "../../components/nav";
import Block from "../../utils/Block";
import { chatsData } from "../../utils/data";
import { ChatContainer } from "./chat-container";
import template from "./main-page.hbs";
import { SideMenu } from "./side-menu";
export class MainPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.props.activeChatId = chatsData.find((chat) => chat.isActive)?.id;
    this.props.handleChatSelect = (e: Event, id: number) => {
      if (e) {
        console.log("Event ", e, " ID ", id);
        (this.children.sideMenu as SideMenu).setProps({
          activeChatId: id,
        });
        (this.children.chatContainer as ChatContainer).setProps({
          activeChat: chatsData.find((chat) => chat.id === id),
        });
      }
    };
    this.children.navBar = new Nav();
    this.children.sideMenu = new SideMenu({
      handleChangeChat: this.props.handleChatSelect,
      activeChatId: this.props.activeChatId,
      events: {
        click: () => {},
      },
    });
    this.children.chatContainer = new ChatContainer({
      activeChat: chatsData.find((chat) => chat.id === this.props.activeChatId),
      isActive: false,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
