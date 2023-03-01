import Block from "../../../utils/Block";
import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import { userData } from "../../../utils/data";

interface SideMenuProps {
  activeChatId: number | undefined;
  handleChangeChat: () => void;
  events: {
    click: (event: Event) => void;
  };
}
export class SideMenu extends Block<SideMenuProps> {
  constructor(props: SideMenuProps) {
    super(props);
  }

  init() {
    this.children.profileBlock = new ProfileBlock({
      avatarSrc: userData.avatar,
      userName: `${userData.firstName} ${userData.lastName}`,
      userStatus: "online",
    });
    this.children.friendsContainer = new FriendsContainer({
      activeChatId: this.props.activeChatId,
      handleChangeChat: this.props.handleChangeChat,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
