import MessagesController from "./MessagesController";
import API, { ChatsAPI } from "../api/ChatsAPI";
import { AddUserToChat, IChat } from "../utils/Interfaces";
import store from "../utils/Store";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    store.set("user.isLoading", true);
    try {
      const chats = await this.api.read();
      chats.map(async (chat: IChat) => {
        if (chat.avatar) {
          chat.avatar = `https://ya-praktikum.tech/api/v2/resources${chat.avatar}`;
        }
        const token = await this.getToken(chat.id);
        if (token) {
          await MessagesController.connect(chat.id, token);
        }
      });
      store.set("chats", chats);
      await Promise.all(
        chats.map(async (chat: IChat) => {
          await this.fetchChatUsers(chat.id);
        })
      );
      store.set("user.isLoading", false);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with fetchChats ${err}`);
    }
  }

  async fetchChatUsers(id: number) {
    store.set("user.isLoading", true);
    try {
      await this.api.getUsers(id).then((users) => {
        const currentChats = store.getState().chats.map((chat) => {
          if (chat.id === id) {
            chat.users = users;
          }
          return chat;
        });
        store.set("chats", currentChats);
        store.set("user.isLoading", false);
      });
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with fetchChatUsers ${err}`);
    }
  }

  async addUserToChat(data: AddUserToChat) {
    store.set("user.isLoading", true);
    try {
      await this.api.addUsers(data.chatId, data.users);
      await this.fetchChatUsers(data.chatId);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with addUserToChat ${err}`);
    }
    store.set("user.isLoading", false);
  }

  async changeChatAvatar(chatId: number, avatar: File) {
    store.set("user.isLoading", true);
    const fileData = new FormData();
    fileData.append("chatId", `${chatId}`);
    fileData.append("avatar", avatar);
    try {
      await this.api.changeChatAvatar(fileData);
      await this.fetchChats();
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with changeChatAvatar ${err}`);
    }
    store.set("user.isLoading", false);
  }

  async delete(id: number) {
    await this.api.delete(id);
    store.set("selectedChatId", undefined);
    this.fetchChats();
  }

  async deleteUserFromChat(data: AddUserToChat) {
    store.set("user.isLoading", true);
    try {
      await this.api.deleteUserFromChat(data.chatId, data.users);
      await this.fetchChatUsers(data.chatId);
      store.set("user.isLoading", false);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with deleteUserFromChat ${err}`);
    }
  }

  getToken(id: number) {
    let token;
    store.set("user.isLoading", true);
    try {
      token = this.api.getToken(id);
    } catch (err) {
      throw new Error(`error with getToken ${err}`);
    }
    store.set("user.isLoading", false);
    return token;
  }

  async selectChat(id: number | undefined) {
    store.set("selectedChatId", id);
    if (id) {
      await MessagesController.getSocket(id);
    }
  }
}

const chatController = new ChatsController();

// @ts-ignore
window.chatsController = chatController;

export default chatController;
