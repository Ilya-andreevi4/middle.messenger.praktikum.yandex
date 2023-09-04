import template from "./profile-block.hbs";
import { Avatar } from "../../../../components/avatar";
import { Icon } from "../../../../components/icon";
import Block from "../../../../utils/Block";
import { Routes, User, userStatus } from "../../../../utils/Interfaces";
import { AvatarsExports, IconsExports } from "../../../../utils/media-exports";
import Router from "../../../../utils/Router";
import { withUser } from "../../../../utils/Store";

interface ProfileBlockProps {
  data: User;
  isLoading: boolean;
  error?: string;
  avatarSrc?: string;
  userName?: string;
  userStatus?: userStatus;
  arrowDownIcon?: string;
  settingsIcon?: string;
}

export class ProfileBlockBase extends Block<ProfileBlockProps> {
  constructor(props: ProfileBlockProps) {
    super(props);
  }

  init() {
    this.props.avatarSrc = this.props.data?.avatar || AvatarsExports.AvatarBox;
    this.props.userName = `${this.props.data?.first_name} ${this.props.data?.second_name}`;
    this.props.userStatus = "online";
    this.props.arrowDownIcon = IconsExports.ArrowDownIcon;
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

  protected componentDidUpdate(oldProps: ProfileBlockProps, newProps: ProfileBlockProps): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      this.setProps({
        data: newProps.data,
        avatarSrc: newProps.data.avatar || AvatarsExports.AvatarBox,
        userName: `${newProps.data.first_name} ${newProps.data.second_name}`
      });
      (this.children.avatar as Avatar).setProps({
        src: newProps.data.avatar || AvatarsExports.AvatarBox
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
export const ProfileBlock = withUser(ProfileBlockBase);
