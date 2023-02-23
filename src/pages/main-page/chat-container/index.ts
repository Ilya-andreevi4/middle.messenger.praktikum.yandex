import Block from "../../../utils/Block";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMain } from "./chat-main";
import template from "./chat-container.hbs";
import { friendsData } from "../../../utils/data/friends-data";

export class ChatContainer extends Block {
  constructor() {
    super();
  }

  init() {
    let isActive = false;
    const activeFriendsChat = friendsData.friends.find(
      (person) => person.isActive
    );
    const activeGroupsChat = friendsData.groups.find((group) => group.isActive);

    if (activeFriendsChat || activeGroupsChat) {
      isActive = true;
    }

    this.children.chatHeader = new ChatHeader({
      isActive,
      avatarSrc: activeFriendsChat
        ? activeFriendsChat.avatar
        : activeGroupsChat
        ? activeGroupsChat.avatar
        : "",
      userName: activeFriendsChat
        ? `${activeFriendsChat.firstName} ${activeFriendsChat.lastName}`
        : activeGroupsChat
        ? activeGroupsChat.title
        : "",
      userStatus: activeFriendsChat ? activeFriendsChat.status : "",
    });
    this.children.chatMain = new ChatMain({
      isActive,
      activeChat: activeFriendsChat ? activeFriendsChat : activeGroupsChat,
    });
    this.children.chatInput = new ChatInput({ isActive });
  }

  render() {
    return this.compile(template, this.props);
  }
}
