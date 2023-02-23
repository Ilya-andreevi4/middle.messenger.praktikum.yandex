import { friendsData } from "../../../utils/data/friends-data";
import Block from "../../../utils/Block";
import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import { userData } from "../../../utils/data/user-data";

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
      people: friendsData,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
