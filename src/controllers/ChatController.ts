import { IChat } from "src/utils/Interfaces";
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
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set("chats", chats);
    console.log("fetch chats success!", chats);

    store.set("user.isLoading", false);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);

    console.log("delete chat success!");

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
