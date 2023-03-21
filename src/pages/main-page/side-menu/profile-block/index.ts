import template from "./profile-block.hbs";
import { Avatar } from "../../../../components/avatar";
import { Icon } from "../../../../components/icon";
import Block from "../../../../utils/Block";
import { Routes, userStatus } from "../../../../utils/Interfaces";
import { AvatarsExports, IconsExports } from "../../../../utils/media-exports";
import Router from "../../../../utils/Router";

interface ProfileBlockProps {
  avatarSrc?: string;
  userName?: string;
  userStatus?: userStatus;
  arrowDownIcon?: string;
  settingsIcon?: string;
}

export class ProfileBlock extends Block<ProfileBlockProps> {
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
        click: () => {
          Router.go(Routes.Profile);
        }
      }
    });
    this.children.avatar = new Avatar({
      src: this.props.avatarSrc || AvatarsExports.AvatarBox,
      className: "profile-header",
      events: {
        click: () => {
          Router.go(Routes.Profile);
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
