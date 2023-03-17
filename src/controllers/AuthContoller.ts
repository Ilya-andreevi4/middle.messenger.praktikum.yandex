import API, { AuthAPI } from "../api/AuthAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import { Routes, SigninData, SignupData } from "../utils/Interfaces";

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
      router.go(Routes.Chats);
    } catch (e: any) {
      console.error(e);
      store.set("user.error", `Возможно вы ввели не правильный пароль или логин:  ${JSON.stringify(e)}`);
      store.set("user.isLoading", false);
    }
  }

  async signup(data: SignupData) {
    store.set("user.isLoading", true);
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.Chats);
    } catch (e) {
      console.error("Trouble with signup in AuthController:", e);
      store.set("user.isLoading", false);
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
      console.error("Error with fetch user from Auth controller: ", e);
      store.set("user.error", `Не удалось найти профиль:  ${JSON.stringify(e)}`);
      store.set("user.isLoading", false);
    }
  }

  async logout() {
    store.set("user.isLoading", true);
    try {
      await this.api.logout();

      store.set("user.data", {});

      router.go(Routes.Index);
      store.set("user.isLoading", false);
    } catch (e) {
      store.set("user.error", `Не удалось выйти из профиля: ${JSON.stringify(e)}`);

      console.error(e);
      store.set("user.isLoading", false);
    }
  }
}

export default new AuthController();
