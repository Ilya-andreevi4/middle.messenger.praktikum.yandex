import { Loader } from "../../layouts/loader";
import { Nav } from "../../components/nav";
import Block from "../../utils/Block";
import { ChatContainer } from "./chat-container";
import template from "./main-page.hbs";
import { SideMenu } from "./side-menu";

export class MainPage extends Block {
  init() {
    this.children.loader = new Loader({});

    this.children.navBar = new Nav("");
    this.children.sideMenu = new SideMenu({});
    this.children.chatContainer = new ChatContainer({});
  }

  render() {
    return this.compile(template, this.props);
  }
}
