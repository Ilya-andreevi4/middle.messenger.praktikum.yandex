import Block from "../../../utils/Block";
import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import { withStore } from "../../../utils/Store";
import { User } from "../../../utils/Interfaces";
import { isEqual } from "../../../utils/helpers";

interface SideMenuProps {
  data: User;
  isLoading: boolean;
  activeChatId: number | undefined;
  handleChangeChat: () => void;
  events: {
    click: (event: Event) => void;
  };
}
class SideMenuBase extends Block<SideMenuProps> {
  constructor(props: SideMenuProps) {
    super(props);
  }

  init() {
    this.children.profileBlock = new ProfileBlock({
      avatarSrc: this.props.data.avatar,
      userName: `${this.props.data.first_name} ${this.props.data.second_name}`,
      userStatus: "online",
    });
    this.children.friendsContainer = new FriendsContainer({
      activeChatId: this.props.activeChatId,
      handleChangeChat: this.props.handleChangeChat,
    });
  }

  protected componentDidUpdate(oldProps: SideMenuProps, newProps: SideMenuProps): boolean {
    console.log("oldProps: ", oldProps);
    console.log("newProps: ", newProps);

    if (!isEqual(oldProps, newProps)) {
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));
//@ts-ignore
export const SideMenu = withUser(SideMenuBase);
