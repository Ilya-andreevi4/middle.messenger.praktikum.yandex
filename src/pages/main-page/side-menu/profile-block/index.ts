import { Avatar } from "../../../../components/avatar";
import Block from "../../../../utils/Block";
import template from "./profile-block.hbs";
import { AvatarsExports, IconsExports } from "../../../../utils/MediaExports";
import { Icon } from "../../../../components/icon";
import { userStatus } from "../../../../utils/interfaces/IUser";

interface ProfileBlockProps {
  avatarSrc: string;
  userName: string;
  userStatus: userStatus;
}

export class ProfileBlock extends Block {
  constructor(props: ProfileBlockProps) {
    super(props);
  }

  init() {
    this.props.arrowDownIcon = IconsExports.ArrowDownIcon;
    this.props.settingsIcon = IconsExports.SettingsIcon;

    this.children.settingsIcon = new Icon({
      src: IconsExports.SettingsIcon,
      className: "profile-block",
      alt: "settings",
      events: {
        click: () => {},
      },
    });

    this.children.avatar = new Avatar({
      src: AvatarsExports.Avatar_1,
      className: "profile-header",
      events: {
        click: () => {},
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
