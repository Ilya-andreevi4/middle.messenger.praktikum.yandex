import Block from "../../utils/Block";
import { ChatContainer } from "./chat-container";
import template from "./main-page.hbs";
import { SideMenu } from "./side-menu";

export class MainPage extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.sideMenu = new SideMenu();
    this.children.chatContainer = new ChatContainer();
  }

  render() {
    return this.compile(template, this.props);
  }
}
