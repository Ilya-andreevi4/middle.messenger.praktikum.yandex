import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import Block from "../../../utils/Block";
import { isEqual } from "../../../utils/helpers";
import { AvatarsExports } from "../../../utils/media-exports";
import { StateProps, withStore } from "../../../utils/Store";

interface SideMenuProps extends StateProps {
  isLoading: boolean;
  isActive: boolean;
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
      avatarSrc: this.props.user?.data?.avatar
        ? this.props.user.data.avatar
        : AvatarsExports.AvatarBox,
      userName: `${this.props.user?.data?.first_name} ${this.props.user?.data?.second_name}`,
      userStatus: "online"
    });
    this.children.friendsContainer = new FriendsContainer({});
    this.props.isActive = !!this.props.selectedChatId;
  }

  protected componentDidUpdate(oldProps: SideMenuProps, newProps: SideMenuProps): boolean {
    if (!isEqual(oldProps.user, newProps.user)) {
      this.setProps({ user: newProps.user });
      return true;
    }

    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.setProps({ chats: newProps.chats });
      return true;
    }

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
export const SideMenu = withStore((state) => ({ ...state }))(SideMenuBase);
