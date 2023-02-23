import { chatsData } from "../../../utils/data";
import Block from "../../../utils/Block";
import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import { userData } from "../../../utils/data";

export class SideMenu extends Block {
  constructor() {
    super();
  }

  init() {
    this.children.profileBlock = new ProfileBlock({
      avatarSrc: userData.avatar,
      userName: `${userData.firstName} ${userData.lastName}`,
      userStatus: "online",
    });
    this.children.friendsContainer = new FriendsContainer({
      chats: chatsData,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
