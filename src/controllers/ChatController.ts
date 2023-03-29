import { AddUserToChat, IChat } from "src/utils/Interfaces";
import MessagesController from "./MessagesController";
import API, { ChatsAPI } from "../api/ChatsAPI";
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
        await MessagesController.connect(chat.id, token);
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
      throw new Error(`Ошибка при запросе к чатам ${err}`);
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
      throw new Error(`error with add user ${err}`);
    }
  }

  async addUserToChat(data: AddUserToChat) {
    store.set("user.isLoading", true);
    try {
      await this.api.addUsers(data.chatId, data.users);
      await this.fetchChatUsers(data.chatId);
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with add user ${err}`);
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
      throw new Error(`error with add user ${err}`);
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
      throw new Error(`error with add user ${err}`);
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number | undefined) {
    store.set("selectedChatId", id);
  }
}

const chatController = new ChatsController();

// @ts-ignore
window.chatsController = chatController;

export default chatController;
