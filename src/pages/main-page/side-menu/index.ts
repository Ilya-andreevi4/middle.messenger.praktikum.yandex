import Block from "../../../utils/Block";
import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import { withUser } from "../../../utils/Store";
import { User } from "../../../utils/Interfaces";
import { isEqual } from "../../../utils/helpers";

interface SideMenuProps {
  data: User;
  isLoading: boolean;
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
    this.children.friendsContainer = new FriendsContainer({});
  }

  protected componentDidUpdate(oldProps: SideMenuProps, newProps: SideMenuProps): boolean {
    if (!isEqual(oldProps.data, newProps.data)) {
      this.setProps({ data: newProps.data });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}
//@ts-ignore
export const SideMenu = withUser(SideMenuBase);
