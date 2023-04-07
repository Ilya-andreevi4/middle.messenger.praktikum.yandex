import { FriendsContainer } from "./friends-container";
import { ProfileBlock } from "./profile-block";
import template from "./side-menu.hbs";
import Block from "../../../utils/Block";
import { withSelectedChatId } from "../../../utils/Store";

interface SideMenuProps {
  isLoading: boolean;
  isActive: boolean;
  selectedChatId?: number;
  events: {
    click: (event: Event) => void;
  };
}
class SideMenuBase extends Block<SideMenuProps> {
  constructor(props: SideMenuProps) {
    super(props);
  }

  init() {
    this.children.profileBlock = new ProfileBlock({});
    this.children.friendsContainer = new FriendsContainer({});
    this.props.isActive = !!this.props.selectedChatId;
  }

  protected componentDidUpdate(oldProps: SideMenuProps, newProps: SideMenuProps): boolean {
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
export const SideMenu = withSelectedChatId(SideMenuBase);
