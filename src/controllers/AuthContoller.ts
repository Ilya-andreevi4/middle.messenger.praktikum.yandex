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
    try {
      console.log("user data in AuthController: ", data);
      await this.api.signin(data);

      router.go(Routes.Chats);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      console.log("user data in AuthController: ", data);
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.Chats);
    } catch (e) {
      console.error("Troble with signup in AuthController:", e);
    }
  }

  async fetchUser() {
    store.set("user.isLoading", true);
    try {
      console.log("try to fetch user from AuthController");

      const user = await this.api.read();

      store.set("user.data", user);
      store.set("user.isLoading", false);
    } catch (e) {
      console.error("Error with fetch user from Auth controller: ", e);
      store.set("user.isLoading", false);
    }
  }

  async logout() {
    store.set("user.isLoading", true);
    try {
      await this.api.logout();

      store.set("user", {});
      store.set("user.isLoading", false);

      router.go(Routes.Index);
    } catch (e) {
      store.set("user.isLoading", false);
      console.error(e);
    }
  }
}

export default new AuthController();
