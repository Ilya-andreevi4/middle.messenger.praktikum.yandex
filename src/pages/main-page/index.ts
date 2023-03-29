import { ChatContainer } from "./chat-container";
import template from "./main-page.hbs";
import { SideMenu } from "./side-menu";
import { Loader } from "../../layouts/loader";
import Block from "../../utils/Block";

export class MainPage extends Block {
  init() {
    this.children.loader = new Loader({});
    this.children.sideMenu = new SideMenu({});
    this.children.chatContainer = new ChatContainer({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
