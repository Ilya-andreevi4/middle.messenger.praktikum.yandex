import Block from "../../../../utils/Block";
import template from "./profile-block.hbs";
import { Avatar } from "../../../../components/avatar";
import { AvatarsExports, IconsExports } from "../../../../utils/media-exports";
import { Icon } from "../../../../components/icon";
import { Routes, userStatus } from "../../../../utils/Interfaces";
import Router from "../../../../utils/Router";

interface ProfileBlockProps {
  avatarSrc?: string;
  userName?: string;
  userStatus?: userStatus;
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
        click: () => {
          Router.go(Routes.Profile);
        },
      },
    });
    this.children.avatar = new Avatar({
      src: this.props.avatarSrc || AvatarsExports.AvatarBox,
      className: "profile-header",
      events: {
        click: () => {
          Router.go(Routes.Profile);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
