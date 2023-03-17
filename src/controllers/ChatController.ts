import { AddUserToChat, IChat } from "src/utils/Interfaces";
import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

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
    const chats = await this.api.read();

    chats.map(async (chat: IChat) => {
      if (chat.avatar) {
        chat.avatar = `https://ya-praktikum.tech/api/v2/resources${chat.avatar}`;
      }
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set("chats", chats);
    store.set("user.isLoading", false);
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
      console.log("chat avatar changed success!");
    } catch (err) {
      store.set("user.isLoading", false);
      throw new Error(`error with add user ${err}`);
    }
    store.set("user.isLoading", false);
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

        console.log("users fetch success!", store.getState().chats, users);
      });
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

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChatId", id);
  }
}

const chatController = new ChatsController();

// @ts-ignore
window.chatsController = chatController;

export default chatController;
