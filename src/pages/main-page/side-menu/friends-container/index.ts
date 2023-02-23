import { IPeople } from "../../../../utils/interfaces/IUser";
import Block from "../../../../utils/Block";
import template from "./friends-container.hbs";
import { IconsExports } from "../../../../utils/MediaExports";
import { Icon } from "../../../../components/icon";

interface FriendsContainerProps {
  people: IPeople;
}

export class FriendsContainer extends Block {
  constructor(props: FriendsContainerProps) {
    super(props);
  }

  init() {
    this.props.friends = this.props.people.friends;
    this.props.groups = this.props.people.groups;
    this.children.searchIcon = new Icon({
      src: IconsExports.SearchIcon,
      className: "chats-header",
      alt: "search",
      events: {
        click: () => {},
      },
    });
    this.children.userIcon = new Icon({
      src: IconsExports.UserIcon,
      className: "chats-header",
      alt: "add user",
      events: {
        click: () => {},
      },
    });
    this.children.groupIcon = new Icon({
      src: IconsExports.GroupIcon,
      className: "chats-header",
      alt: "add group",
      events: {
        click: () => {},
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
