import chatController from "./ChatController";
import MessagesController from "./MessagesController";
import API, { AuthAPI } from "../api/AuthAPI";
import { Routes, SigninData, SignupData } from "../utils/Interfaces";
import router from "../utils/Router";
import store from "../utils/Store";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    store.set("user.isLoading", true);
    try {
      await this.api.signin(data);
      await this.fetchUser();
      await chatController.fetchChats();
      router.go(Routes.Chats);
    } catch (e: any) {
      store.set(
        "user.error",
        `Возможно вы ввели не правильный пароль или логин:  ${JSON.stringify(e)}`
      );
      store.set("user.isLoading", false);
      throw new Error(`Возможно вы ввели не правильный пароль или логин ${e}`);
    }
  }

  async signup(data: SignupData) {
    store.set("user.isLoading", true);
    try {
      await this.api.signup(data);
      await this.fetchUser();
      await chatController.fetchChats();
      router.go(Routes.Chats);
    } catch (e) {
      store.set("user.isLoading", false);
      throw new Error(`Trouble with signup in AuthController: ${e}`);
    }
  }

  async fetchUser(id?: number) {
    store.set("user.isLoading", true);

    try {
      const user = await this.api.read(id);
      if (!user.display_name) {
        user.display_name = user.login;
      }

      store.set("user.data", user);

      if (user.avatar) {
        store.set("user.data.avatar", `https://ya-praktikum.tech/api/v2/resources${user.avatar}`);
      }
      store.set("user.error", undefined);
      store.set("user.isLoading", false);
    } catch (e) {
      store.set("user.error", `Не удалось найти профиль:  ${JSON.stringify(e)}`);
      store.set("user.isLoading", false);
      throw new Error(`Error with fetch user from Auth controller: ${e}`);
    }
  }

  async logout() {
    store.set("user.isLoading", true);
    try {
      MessagesController.closeAll();
      await this.api.logout();

      store.set("user.data", {});
      store.set("chat", []);
      store.set("messages", undefined);
      store.set("selectedChatId", undefined);

      router.go(Routes.Index);
      store.set("user.isLoading", false);
    } catch (e) {
      store.set("user.error", `Не удалось выйти из профиля: ${JSON.stringify(e)}`);
      store.set("user.isLoading", false);
      throw new Error(`Не удалось выйти из профиля: ${e}`);
    }
  }
}

export default new AuthController();
